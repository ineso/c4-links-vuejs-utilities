<template>
  <div class="relative flex items-center">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-10 w-full h-full"
      @click="isOpen = null"
    />
    <div
      class="w-full pl-4 text-sm text-right cursor-pointer"
    >
      <div
        class="flex items-center"
        @click="isOpen = true"
      >
        <span
          v-if="selectedClass"
          class="inline-block px-4 py-2 pr-8 text-sm leading-tight text-left text-white
                 truncate appearance-none cursor-pointer bg-blue-carrefour focus:outline-none
                 hover:opacity-75"
          :data-cy="`filter_${filterKey}_required`"
        >
          {{ selectedClass }}
        </span>
        <span
          v-else
          class="inline-block w-40 px-4 py-2 pr-8 text-sm leading-tight text-left text-white
                 truncate appearance-none cursor-pointer bg-blue-carrefour focus:outline-none
                 hover:opacity-75"
          :data-cy="`filter_${filterKey}_required`"
        >
          {{ emptyValue }}
        </span>
      </div>
      <div
        v-show="isOpen"
        class="absolute right-0 z-20 px-2 py-2 mt-2 text-left text-white shadow-md
               bg-blue-carrefour"
        :style="[{'min-width': minWidth}, {'max-width': maxWidth}]"
      >
        <div
          :style="{'max-height': maxHeight}"
          class="overflow-auto"
          :data-cy="`list-${filterKey}_required`"
        >
          <div>
            <template
              v-if="filtersLoading[ filterKey ]"
            >
              Loading...
            </template>
            <template v-else>
              <label
                v-if="showEmpty"
                class="flex items-center my-2 text-xs leading-tight cursor-pointer hover:opacity-75"
              >
                <span
                  value=""
                  @click="selectedClass = '', isOpen = false"
                >
                  {{ emptyValue }}
                </span>
              </label>
              <label
                v-for="value in options"
                :key="value.key"
                class="flex items-center my-2 text-xs leading-tight cursor-pointer hover:opacity-75"
              >
                <span
                  :value="value.key"
                  :data-cy="`${value.key}_required`"
                  @click="selectedClass = value.key, isOpen = false"
                >
                  {{ value.label }}
                </span>
              </label>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import isEqual from 'lodash-es/isEqual'
import find from 'lodash-es/find'
import { ref, watch, computed } from 'vue'
import { useGtm } from 'vue-gtm'
import useFilters from '../../../features/useFilters'
import useEvents from '../../../features/useEvents'

export default {
  name: 'ListSelectionRegion',

  props: {
    filterKey: {
      type: String,
      required: false,
      default: 'class'
    },
    emptyValue: {
      type: String,
      required: false,
      default: '- Select -'
    },
    showEmpty: {
      type: Boolean,
      required: false,
      default: true
    },
    minWidth: {
      type: String,
      required: false,
      default: '200px'
    },
    maxWidth: {
      type: String,
      required: false,
      default: '200px'
    },
    maxHeight: {
      type: String,
      required: false,
      default: '250px'
    }
  },

  setup (props) {
    const gtm = useGtm()
    const { sendEvents } = useEvents({ gtm })
    const {
      filtersOptions,
      updateFilter,
      filtersFields,
      filters,
      confirmedFilters,
      confirm,
      filtersLoading
    } = useFilters()
    const selectedClass = ref('')
    const isOpen = ref(false)

    watch(isOpen, (val, old) => {
      if (val) {
        const itemFilter = find(filtersFields.value, { key: props.filterKey })
        if (itemFilter) {
          updateFilter(itemFilter)
        }
      } else if (old) {
        confirm({ sidebar: false })
        sendEvents({
          event: 'filters',
          category: 'Topbar Filter',
          fields: [ props.filterKey ]
        })
      }
    })

    const resyncSidebarFilter = () => {
      const val = selectedClass.value
      const filterVal = val ? [val] : []
      if (!isEqual(filterVal, filters.value[ props.filterKey ])) {
        filters.value[ props.filterKey ] = filterVal
        confirm({ sidebar: null })
        sendEvents({
          event: 'filters',
          category: 'Topbar Filter',
          fields: [ props.key ]
        })
      }
    }

    const options = computed(() => filtersOptions.value[ props.filterKey ])

    watch(options, (val) => {
      if (val && selectedClass.value && !find(val, { key: selectedClass.value })) {
        selectedClass.value = ''
        resyncSidebarFilter()
      }
    }, { immediate: true, deep: true })

    watch(confirmedFilters, (val) => {
      if (val && val[ props.filterKey ]) {
        selectedClass.value = val[ props.filterKey ].length === 1 ? val[ props.filterKey ][0] : ''
        resyncSidebarFilter()
      }
    }, { immediate: true, deep: true })

    watch(selectedClass, (val) => {
      resyncSidebarFilter()
    }, { deep: true, immediate: true })

    return {
      selectedClass,
      options,
      isOpen,
      filtersLoading
    }
  }
}
</script>
