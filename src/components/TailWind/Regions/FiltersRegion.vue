<template>
  <div
    class="fixed top-0 bottom-0 right-0 z-10 h-full pt-16 overflow-hidden transition-all
           duration-300 transform side-navigation w-96"
    :class="{'translate-x-96': !showSidebar}"
  >
    <div
      class="h-full overflow-auto border-l font-secondary border-grey-300"
      :style="{ 'background-color': '#F0F4F7' }"
    >
      <div class="pt-2 font-secondary">
        <h3
          class="relative items-center justify-between px-4 pt-6 mb-8 ml-2 text-sm 
                 font-semibold uppercase"
        >
          <span>
            Filter your dashboards
          </span>
          <a
            href="javascript:void(0)"
            class="absolute top-0 right-0 mt-4 mr-4 hover:opacity-75"
            @click="showSidebar = false"
          >
            <img
              class="w-4 h-4 mt-2 ml-auto mr-2 text-black fill-current"
              src="../../../assets/icons/icon-cross.svg"
              svg-inline
            >
          </a>
        </h3>
        <div
          v-if="openDropdownField"
          class="fixed inset-0 z-10 w-full h-full"
          @click="openDropdownField = null"
        />
        <div
          class="px-4 overflow-auto"
          :style="{ height: 'calc(100vh - 283px)' }"
        >
          <BookmarksSelector
            :mode="mode"
            @selected="setFilters"
          />
          <div
            v-if="filtersFieldsByCategoryDisplayed.length === 0"
            class="border-b border-gray-200"
          >
            <Loader
              :fixed="true"
              class="z-30"
            />
          </div>
          <div
            v-for="(category, index) in filtersFieldsByCategoryDisplayed"
            v-else
            :key="index"
            class="px-4 pb-4 mt-4 bg-white"
          >
            <h4 class="pt-2 pl-2 -mb-1 text-sm font-semibold uppercase">
              {{ category.label }}
            </h4>
            <div
              v-if="category.categories && category.categories.length > 0"
              class="border-b border-gray-200"
            >
              <nav
                class="flex -mb-px space-x-4"
                aria-label="Tabs"
              >
                <template
                  v-for="cat in category.categories"
                  :key="cat.key"
                >
                  <a
                    href="javascript:void(0);"
                    class="px-2 pb-2 mt-4 text-sm border-b-2 border-transparent hover:text-gray-700
                           hover:border-gray-300 whitespace-nowrap"
                    :class="{
                      'text-black font-medium border-blue-400': filters[category.group] === cat.key,
                      'font-normal': filters[category.group] !== cat.key}"
                    @click="filters[category.group] = cat.key"
                  >{{ cat.label }}</a>
                </template>
              </nav>
            </div>
            <div
              v-for="filter in category.fields"
              v-show="!filter.onlyAdvanced || isAdvancedVisible"
              :key="filter.key"
              class="relative flex items-center justify-between mt-4"
            >
              <label
                class="relative block w-1/2 pl-2 text-sm"
                :for="`field-${filter.key}`"
              >
                {{ filter.label }}
                <AnimatedPing
                  class="inline-block"
                  :visible="filtersLoading[filter.key]"
                />
              </label>
              <div
                v-if="filter.type === 'checkbox'"
                class="w-1/2 select-none"
                :data-cy="`filter_${filter.key}`"
              >
                <div
                  class="w-full text-sm leading-none text-right truncate cursor-pointer"
                  @click="openDropdownField = filter.key"
                >
                  <span
                    v-if="filters[filter.key] && filters[filter.key].length"
                    class="text-xs antialiased font-semibold"
                  >
                    {{ filters[filter.key].length === 1 ?
                      filters[filter.key][0] :
                      `${filters[filter.key].length} selected` }}
                  </span>
                  <span
                    v-else
                    class="text-xs tracking-widest uppercase opacity-75"
                  >
                    Select
                  </span>
                </div>
                <div
                  v-show="openDropdownField === filter.key"
                  class="absolute right-0 z-20 px-2 py-2 bg-gray-200 shadow-md"
                  :style="[{'min-width': minWidth}, {'max-width': maxWidth}]"
                >
                  <input
                    v-if="filter.searchable"
                    v-model="searchInput[filter.key]"
                    type="text"
                    class="w-full px-1 mb-2"
                    @keyup.enter="selectFiltered(filter)"
                  />
                  <div
                    v-if="filter.bulkSelectable"
                    class="text-xs"
                  >
                    Select
                    <a
                      href="javascript:void(0)"
                      class="text-blue-400 hover:opacity-75"
                      @click="selectAll(filter)"
                    >All</a>
                    /
                    <a
                      href="javascript:void(0)"
                      class="text-blue-400 hover:opacity-75"
                      @click="selectNone(filter)"
                    >None</a>
                  </div>
                  <div
                    :id="`field-${filter.key}`"
                    class="overflow-auto"
                    :style="{'max-height': maxHeight}"
                    :data-cy="`list-${filter.key}`"
                  >
                    <template
                      v-if="filtersLoading[filter.key]"
                    >
                      Loading...
                    </template>
                    <template v-else>
                      <label
                        v-for="option in filteredFiltersOptions[filter.key]"
                        :key="option.key"
                        class="flex items-center my-2 text-xs leading-tight cursor-pointer
                               hover:opacity-75"
                      >
                        <input
                          v-model="filters[filter.key]"
                          type="checkbox"
                          :value="option.key"
                          class="flex-shrink-0 w-4 h-4 mr-1 bg-white border border-gray-300 rounded
                                 outline-none appearance-none"
                          :data-cy="option.key"
                        >
                        <span>{{ option.label }}</span>
                      </label>
                    </template>
                  </div>
                </div>
              </div>
              <div
                v-else-if="filter.type === 'select'"
                class="w-1/2 select-none"
                :data-cy="`filter_${filter.key}`"
              >
                <div
                  class="w-full text-sm leading-none text-right truncate cursor-pointer"
                  @click="openDropdownField = filter.key"
                >
                  <span
                    class="text-xs antialiased font-semibold"
                  >
                    {{ filters[filter.key] }}
                  </span>
                </div>
                <div
                  v-show="openDropdownField === filter.key"
                  class="absolute right-0 z-20 px-2 py-2 bg-gray-200 shadow-md"
                  :style="[{'min-width': minWidth}, {'max-width': maxWidth}]"
                >
                  <div
                    :id="`field-${filter.key}`"
                    class="overflow-auto"
                    :style="{'max-height': maxHeight}"
                    :data-cy="`list-${filter.key}`"
                  >
                    <template
                      v-if="filtersLoading[filter.key]"
                    >
                      Loading...
                    </template>
                    <template v-else>
                      <label
                        v-for="option in filteredFiltersOptions[filter.key]"
                        :key="option.key"
                        class="flex items-center my-2 text-md leading-tight cursor-pointer
                               hover:opacity-75"
                      >
                        <span
                          :value="option.key"
                          :data-cy="option.key"
                          @click="filters[filter.key] = option.key, openDropdownField = false"
                        >
                          {{ option.label }}</span>
                      </label>
                    </template>
                  </div>
                </div>
              </div>
              <div
                v-else-if="filter.type === 'radio'"
                class="flex leading-none select-none"
                :data-cy="`filter_${filter.key}`"
              >
                <label
                  v-for="option in filteredFiltersOptions[filter.key]"
                  :key="option.key"
                  class="flex items-center my-2 ml-3 text-xs leading-tight cursor-pointer
                         hover:opacity-75"
                >
                  <input
                    v-model="filters[filter.key]"
                    type="radio"
                    :value="option.key"
                    class="flex-shrink-0 w-4 h-4 mr-1 bg-white border border-gray-300 rounded
                           outline-none"
                    :data-cy="option.key"
                  >
                  <span class="whitespace-no-wrap">{{ option.label }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="fixed bottom-0 w-full mb-12 bg-blue-400">
          <div class="absolute right-0 -mt-8">
            <button
              type="button"
              class="flex items-center px-3 pt-2 pb-1 mx-auto text-xs leading-none text-blue-400
                     rounded-full cursor-pointer custom-reset focus:outline-none hover:opacity-75"
              data-cy="btn_reset_filters"
              @click="reset"
            >
              <img
                src="../../../assets/icons/icon-reset.svg"
                svg-inline
                class="w-4 h-4 text-blue-400 fill-current"
              >
              <span class="ml-1">Reset</span>
            </button>
          </div>
          <button
            type="button"
            class="block w-full px-4 py-4 font-medium leading-tight text-white uppercase
                   bg-blue-400 cursor-pointer focus:outline-none hover:opacity-75"
            data-cy="btn_run"
            @click="applyFilters"
          >
            Run
          </button>
        </div>

        <BookmarksActions
          :filters="filters"
          :mode="mode"
        />
      </div>
    </div>
  </div>
</template>

<script>
import map from 'lodash-es/map'
import filter from 'lodash-es/filter'
import isEqual from 'lodash-es/isEqual'
import { computed } from 'vue'
import { useGtm } from 'vue-gtm'
import useFilters from '../../../features/useFilters'
import useEvents from '../../../features/useEvents'
import useUser from '../../../features/useUser'
import useBookmarks from '../../../features/useBookmarks'
import BookmarksActions from '../../../components/TailWind/Bookmarks/BookmarksActions.vue'
import BookmarksSelector from '../../../components/TailWind/Bookmarks/BookmarksSelector.vue'

export default {
  name: 'FiltersRegion',

  components: {
    BookmarksActions,
    BookmarksSelector
  },

  props: {
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
    },
    mode: {
      type: String,
      required: true,
      default: 'datashopper'
    },
  },

  setup () {
    const gtm = useGtm()
    const filters = useFilters()
    const { sendEvents } = useEvents({ gtm })
    const { user } = useUser()
    const { selectedBookmark } = useBookmarks()

    const isCurrentBookmarks = computed(() => {
      const filtersVal = filters.filters.value
      const selectedBookmarkVal = selectedBookmark.value?.config
      return isEqual({ ...filtersVal }, { ...selectedBookmarkVal })
    })

    const updateFilter = (f) => {
      filters.updateFilter(f)
    }

    const applyFilters = () => {
      filters.confirm({ sidebar: false })
      sendEvents({
        event: 'filters',
        category: 'Sidebar Filter'
      })

      filters.triggerDashboard({ val: true })

      if (isCurrentBookmarks.value) {
        if (gtm) {
          gtm.trackEvent({
            event: 'actions',
            category: 'Bookmark',
            action: 'Use',
            label: 'Apply'
          })
        }
      }
    }

    const filtersFieldsByCategoryDisplayed = computed(() => {
      return map(filters.filtersFieldsByCategory.value, category => {
        return {
          ...category,
          categories: filter(
              category.categories,
              cat =>
                  !cat.access || user.value?.datashopper?.permissions.includes(cat.access)
          ),
          fields: filter(
            category.fields,
            field =>
              !field.categories ||
              !filters.selectedCategories.value[category.group] ||
              field.categories.includes(filters.selectedCategories.value[category.group])
          )
        }
      })
    })

    return {
      ...filters,
      filtersFieldsByCategoryDisplayed,
      applyFilters,
      updateFilter
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
