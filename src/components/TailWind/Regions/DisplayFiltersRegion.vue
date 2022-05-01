<template>
  <div>
    <teleport
      v-if="showFiltersPopup"
      to="#filters-summary"
    >
      <div class="px-4 py-4 bg-white modal shadow-filters">
        <h3 class="mb-2 text-sm font-semibold uppercase">
          Applied filters:
        </h3>
        <ul class="column">
          <li
            v-for="(item, index) in data"
            :key="index"
            class="flex py-1 pl-0 pr-6 mr-2"
          >
            <span class="flex-shrink-0 w-32 mr-2 font-semibold uppercase text-xxs">
              {{ item.type }}:
            </span>
            <span class="font-medium text-xxs cell">
              {{ item.value }}
            </span>
          </li>
        </ul>
      </div>
    </teleport>

    <div class="fixed left-0 ml-6 -mt-3 pointer-events-auto z-11">
      <div class="relative">
        <a
          href="javascript:void(0)"
          class="relative flex items-center w-6 h-6 text-sm font-semibold text-center rounded-full"
          :class="{'bg-blue-carrefour': showFiltersPopup}"
          @click="showFiltersPopup = !showFiltersPopup"
        >
          <img
            src="../../../assets/icons/icon-filters.svg"
            class="w-4 h-4 mx-auto outline-none fill-current"
            :style="{ 'margin-top': '2px' }"
            :class="{'text-white': showFiltersPopup}"
            svg-inline
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'DisplayFiltersRegion',

  props: {
    data: {
      type: Array,
      required: true
    }
  },

  setup () {
    const showFiltersPopup = ref(false)

    return {
      showFiltersPopup
    }
  }
}
</script>

<style scoped>
.column {
  column-rule-style: solid;
  column-rule-width: 1px;
  column-rule-color: #D4D8DB;
  column-gap: 20px;
  column-width: 256px;
}

.cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
