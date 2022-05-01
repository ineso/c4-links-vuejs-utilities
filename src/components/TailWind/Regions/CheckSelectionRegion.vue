<template>
  <div class="relative flex items-center">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-10 w-full h-full"
      @click="isOpen = false"
    />
    <div
      class="w-full pl-4 text-sm text-right cursor-pointer"
      @click="isOpen = true"
    >
      <div
        v-if="confirmedFilters[ filterKey ]"
        class="flex items-center"
      >
        <span
          v-if="confirmedFilters[ filterKey ].length"
          class="inline-block px-4 py-2 pr-8 text-sm leading-tight text-left text-white
                 truncate appearance-none cursor-pointer bg-blue-carrefour
                 focus:outline-none hover:opacity-75"
          :style="{ width: '9rem' }"
          :data-cy="`filter_${filterKey}_required`"
        >
          {{ confirmedFilters[ filterKey ].length === 1 ?
            confirmedFilters[ filterKey ][0] :
            `${confirmedFilters[ filterKey ].length} selected` }}
        </span>
        <span
          v-if="!confirmedFilters[ filterKey ].length"
          class="inline-block w-40 px-4 py-2 pr-8 text-sm leading-tight text-left text-white
                 truncate appearance-none cursor-pointer bg-blue-carrefour
                 focus:outline-none hover:opacity-75"
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
        <input
          v-model="searchInput[ filterKey ]"
          type="text"
          class="w-full px-1 mb-2 text-black"
        />
        <div class="text-xs text-left">
          Select
          <a
            class="text-white hover:opacity-75"
            href="javascript:void(0)"
            @click="selectAll({ key: filterKey })"
          >All</a>
          /
          <a
            class="text-white hover:opacity-75"
            href="javascript:void(0)"
            @click="selectNone({ key: filterKey })"
          >None</a>
        </div>
        <div
          class="overflow-auto"
          :style="{'max-height': maxHeight}"
          :data-cy="`list-${filterKey}_required`"
        >
          <template
            v-if="filtersLoading[ filterKey ]"
          >
            Loading...
          </template>
          <template v-else>
            <label
              v-for="value in filteredFiltersOptions[ filterKey ]"
              :key="value.key"
              class="flex items-center my-2 text-xs leading-tight cursor-pointer hover:opacity-75"
            >
              <input
                v-model="filters[ filterKey ]"
                type="checkbox"
                class="flex-shrink-0 w-4 h-4 mr-1 bg-white border border-gray-300 rounded
                      outline-none appearance-none cursor-pointer"
                :value="value.key"
                :data-cy="`${value.key}_required`"
              >
              <span>{{ value.label }}</span>
            </label>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useGtm } from 'vue-gtm'
import find from 'lodash-es/find'
import useFilters from '../../../features/useFilters'
import useEvents from '../../../features/useEvents'

export default {
  name: 'CheckSelectionRegion',

  props: {
    filterKey: {
      type: String,
      required: false,
      default: 'not defined'
    },
    emptyValue: {
      type: String,
      required: false,
      default: '- Select -'
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
      filters,
      confirmedFilters,
      filteredFiltersOptions,
      searchInput,
      selectAll,
      selectNone,
      updateFilter,
      filtersFields,
      confirm,
      filtersLoading
    } = useFilters()
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

    return {
      isOpen,
      filters,
      confirmedFilters,
      filteredFiltersOptions,
      searchInput,
      selectAll,
      selectNone,
      filtersLoading
    }
  }
}
</script>

<style lang="postcss" scoped>
[type='checkbox']:checked {
  background-color: #235695;
  background-image: url("data:image/svg+xml,%3csvg
    viewBox='0 0 16 16'
    fill='white'
    xmlns='http://www.w3.org/2000/svg'%3e%3cpath
    d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 
    011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
}
</style>
