// Copyright Carrefour(2022)
//

import each from 'lodash-es/each'
import map from 'lodash-es/map'
import pick from 'lodash-es/pick'
import intersection from 'lodash-es/intersection'
import omit from 'lodash-es/omit'
import find from 'lodash-es/find'
import filter from 'lodash-es/filter'
import includes from 'lodash-es/includes'
import groupBy from 'lodash-es/groupBy'
import uniq from 'lodash-es/uniq'
import mapValues from 'lodash-es/mapValues'
import without from 'lodash-es/without'
import sortBy from 'lodash-es/sortBy'
import isArray from 'lodash-es/isArray'
import isEmpty from 'lodash-es/isEmpty'
import capitalize from 'lodash-es/capitalize'
import dayjs from 'dayjs'
import { ref, watch, computed, nextTick } from 'vue'
import useError from 'c4-links-vuejs-utilities/src/features/useError'
import useUI from 'c4-links-vuejs-utilities/src/features/useUI'
import useLooker from 'c4-links-vuejs-utilities/src/features/useLooker'
import { persistFilters } from 'c4-links-vuejs-utilities/src/utils'

const { addError } = useError()
const { fetchLookData } = useLooker()
const { showSidebar } = useUI()

const isReset = ref(null)
const openDropdownField = ref(null)
const isTriggered = ref(null)
const itemFilter = ref(null)
const searchInput = ref({})
const filtersOptions = ref({})
const filtersLoading = ref({})
const filters = ref({})
const defaultFiltersOptions = ref({})
const defaultFilters = ref({})
const filtersFields = ref([])
const availableLookerFilters = ref([])
const lookFilters = ref({})
const dashboardFilters = ref({})
const confirmedFilters = ref({})
const isAdvancedVisible = ref(true)
const filterGroups = ref([])

let cookieName = null

const assignFilterGroups = (groups = []) => {
  filterGroups.value = groups
}

const assignFilters = (f, savedFilters, countries, cookie = null) => {
  filtersFields.value = f.filtersFields
  searchInput.value = { ...f.defaultSearchInput }
  filtersOptions.value = { ...f.defaultFiltersOptions }
  defaultFiltersOptions.value = { ...f.defaultFiltersOptions }
  defaultFilters.value = { ...f.defaultFilters }
  filtersLoading.value = { ...f.defaultFiltersLoading }
  filters.value = { ...f.defaultFilters, ...savedFilters }
  confirmedFilters.value = { ...filters.value }

  cookieName = cookie

  // Check if filtered countries are in the authorized list
  if (Array.isArray(countries)) {
    filters.value.country = filter(filters.value.country, (c) => includes(countries, c))
  }

  defaultFiltersOptions.value.country = map(countries,
    country => ({ key: country, label: country })
  )
  filtersOptions.value.country = defaultFiltersOptions.value.country

  let defaultCountry = (defaultFiltersOptions.value.country[0] || {}).key
  if (find(defaultFiltersOptions.value.country, { key: 'France' })) {
    defaultCountry = 'France'
  }
  if (find(defaultFiltersOptions.value.country, { key: 'FRANCE' })) {
    defaultCountry = 'FRANCE'
  }
  if (Array.isArray(defaultFilters.value.country)) {
    defaultCountry = [defaultCountry]
  }
  defaultFilters.value.country = defaultCountry
  if (!filters.value.country ||
    (Array.isArray(filters.value.country) && !filters.value.country.length)) {
    filters.value.country = defaultCountry
  }
}

const lookerFilters = computed(() => {
  const lookerLookFiltersObj = {}
  const lookerDashboardFiltersObj = {}
  each(filtersFields.value, f => {
    const formatValue = (val) => {
      const lookerVal = f.override && f.override[val] ? f.override[val] : val
      return (lookerVal || '').includes(',') ? '"' + lookerVal + '"' : lookerVal
    }

    let formattedValue = ''
    const value = filters.value[f.key]
    if (f.key === 'dateRange') {
      const dateRangePresetValue = filters.value.dateRangePreset
      if (dateRangePresetValue) {
        formattedValue = dateRangePresetValue
      } else {
        const [start, end] = (value || '').split(' to ')
        formattedValue = [
          dayjs(start).format('YYYY-MM-DD'),
          dayjs(end).add(1, 'day').format('YYYY-MM-DD')
        ].join(' to ')
      }
    } else if (isArray(value)) {
      formattedValue = map(value, formatValue).join(',')
    } else {
      formattedValue = formatValue(value)
    }

    if (f.lookerField) {
      lookerLookFiltersObj[f.lookerField] = formattedValue
    }

    if (f.lookerFieldAlt) {
      each(f.lookerFieldAlt, fieldAlt => {
        lookerLookFiltersObj[fieldAlt] = formattedValue
      })
    }

    if (f.lookerFilter && availableLookerFilters.value.includes(f.lookerFilter)) {
      lookerDashboardFiltersObj[f.lookerFilter] = formattedValue
    }
  })

  return {
    look: { ...lookerLookFiltersObj },
    dashboard: { ...lookerDashboardFiltersObj }
  }
})

const abortByFilterKey = {}
const fetchFilterData = (filterField) => {
  if (abortByFilterKey[filterField.key]) {
    abortByFilterKey[filterField.key].abort()
  }
  filtersLoading.value[filterField.key] = true
  abortByFilterKey[filterField.key] = new AbortController()
  fetchLookData({
    lookId: filterField.look,
    query: {
      limit: 10000,
      filters: omit(lookerFilters.value.look,
        [filterField.lookerField, ...filterField.lookerFieldAlt || []]
      )
    },
    signal: abortByFilterKey[filterField.key].signal
  }).then(response => {
    filtersOptions.value[filterField.key] = map(response.data, item => {
      if (item[filterField.lookerField]) {
        return { key: item[filterField.lookerField], label: item[filterField.lookerField] }
      }
      let line = {}
      each(filterField.lookerFieldAlt, fieldAlt => {
        if (item[fieldAlt]) {
          line = { key: item[fieldAlt], label: item[fieldAlt] }
        }
      })
      return line
    })
    if (defaultFiltersOptions.value[filterField.key].length) {
      filtersOptions.value[filterField.key] = filter(
        filtersOptions.value[filterField.key],
        item => find(defaultFiltersOptions.value[filterField.key], { key: item.key })
      )
    }
    if (isArray(filters.value[filterField.key])) {
      filters.value[filterField.key] = intersection(
        filters.value[filterField.key],
        map(filtersOptions.value[filterField.key], 'key')
      )
    }
  }).catch((err) => {
    if (err.name !== 'AbortError') {
      // eslint-disable-next-line no-console
      console.error(err.toString())
      addError({
        message: 'A server error occurred, please retry later or refresh your page.',
        details: err.toString()
      })
    }
    filtersLoading.value[filterField.key] = false
  }).finally(() => {
    filtersLoading.value[filterField.key] = false
  })
}

const applyFilters = () => {
  each(filtersFields.value, filterField => {
    const v = filters.value[filterField.key] || []
    if (filterField.look && v.length > 0) {
      fetchFilterData(filterField)
    } else if (filterField.disable) {
      delete filters.value[filterField.key]
    }
  })
}

const updateFilter = (filterField) => {
  if (filterField.look) {
    fetchFilterData(filterField)
  } else if (filterField.disable) {
    delete filters.value[filterField.key]
  }
}

const filteredFiltersOptions = computed(() => {
  return mapValues(filtersOptions.value, (options, key) => sortBy(filter(options, option => {
    const val = searchInput.value[key] || ''
    if (val.includes(',')) {
      const list = val.toLowerCase().split(',')
      return list.includes(option.label.toLowerCase())
    } else {
      return String(option.label).toLowerCase().includes(String(val).toLowerCase())
    }
  })))
})

watch(openDropdownField, (val, old) => {
  if (val) {
    itemFilter.value = find(filtersFields.value, { key: val })
    if (itemFilter.value) {
      updateFilter(itemFilter.value)
    }
  }
})

const filtersFieldsByCategory = computed(() => {
  const groups = []

  const groupedFiltersFields = groupBy(
    filter(
      filtersFields.value,
      item => availableLookerFilters.value.includes(item.lookerFilter)
    ),
    'group'
  )

  each(filterGroups.value, item => {
    if ((groupedFiltersFields[item.group] || []).length) {
      groups.push({ ...item, fields: groupedFiltersFields[item.group] })
    }
  })

  return groups
})

const selectedCategories = computed(() => pick(filters.value, ['product']))
watch(selectedCategories, (categories, categoriesOld) => {
  each(categories, (val, key) => {
    if (val !== categoriesOld[key]) {
      const group = find(filtersFieldsByCategory.value, { group: key }) || {}
      each(group.fields, field => {
        if (!['item', 'barcode'].includes(field.key)) {
          filters.value[field.key] = defaultFilters.value[field.key]
        }
      })
      applyFilters()
    }
  })
}, { deep: true })

const confirm = ({ sidebar = false } = {}) => {
  persistFilters.saveFilters(cookieName, filters.value)
  dashboardFilters.value = lookerFilters.value.dashboard
  lookFilters.value = lookerFilters.value.look
  confirmedFilters.value = { ...filters.value }
  showSidebar.value = sidebar ? showSidebar.value : sidebar
}

const triggerDashboard = ({ val = false }) => {
  isTriggered.value = val
}

const reset = () => {
  filters.value = { ...defaultFilters.value }
  isReset.value = true
  confirm({ sidebar: true })
}

const selectAll = (f) => {
  filters.value[f.key] = uniq([
    ...filters.value[f.key],
    ...map(filteredFiltersOptions.value[f.key], 'key')
  ])
}

const selectFiltered = (f) => {
  if (searchInput.value[f.key]) {
    selectAll(f)
  }
}

const selectNone = (f) => {
  filters.value[f.key] = without(
    filters.value[f.key],
    ...map(filteredFiltersOptions.value[f.key], 'key')
  )
}

const setFilters = (data = {}) => {
  filters.value.product = data.product
  nextTick(() => {
    filters.value = {
      ...filters.value,
      ...data
    }
    applyFilters()
  })
}

const setAvailableLookerFilters = (value) => {
  if (value) {
    availableLookerFilters.value = value
  }
}

const confirmedFiltersDisplay = computed(() => {
  const output = []
  each(lookerFilters.value.dashboard, (val, lookerKey) => {
    const field = find(filtersFields.value, { lookerFilter: lookerKey })
    if (field && !field.disable) {
      let value = ''
      if (field.key === 'dateComparison') {
        value = isEmpty(confirmedFilters.value[field.key]) ?
          'N/A' :
          'Previous ' + confirmedFilters.value[field.key]
      } else if (field.type === 'checkbox') {
        if (isEmpty(confirmedFilters.value[field.key])) {
          value = 'All'
        } else if (confirmedFilters.value[field.key].length === 1) {
          value = confirmedFilters.value[field.key][0]
        } else {
          value = `${confirmedFilters.value[field.key].length} selected`
        }
      } else if (field.type === 'radio') {
        value = isEmpty(confirmedFilters.value[field.key]) ?
          'All' :
          capitalize(confirmedFilters.value[field.key])
      } else {
        value = isEmpty(confirmedFilters.value[field.key]) ?
          'N/A' :
          capitalize(confirmedFilters.value[field.key])
      }
      output.push({ type: field.label, value })
    }
  })
  return output
})

confirm({ sidebar: null })

/**
 * Returns a set of functions to manage filters.
 * 
 * @return {Object} functions to manage filters.
 */
const useFilters = () => {
  return {
    assignFilterGroups,
    assignFilters,
    setFilters,
    openDropdownField,
    searchInput,
    filtersFieldsByCategory,
    filtersOptions,
    filteredFiltersOptions,
    filtersLoading,
    filters,
    filtersFields,
    confirmedFilters,
    confirmedFiltersDisplay,
    lookFilters,
    dashboardFilters,
    showSidebar,
    isAdvancedVisible,
    availableLookerFilters,
    setAvailableLookerFilters,
    confirm,
    reset,
    selectAll,
    selectFiltered,
    selectNone,
    updateFilter,
    isTriggered,
    isReset,
    triggerDashboard,
    selectedCategories
  }
}

export default useFilters
