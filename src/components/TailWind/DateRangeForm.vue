<template>
  <div
    v-show="visible"
    class="fixed z-20 px-4 py-4 transform -translate-x-1/2 -translate-y-1/2
            bg-white rounded shadow-sm top-1/2 left-1/2"
  >
    <div class="text-left">
      <label class="block pt-2 pb-2 -mb-1 text-sm font-semibold uppercase">
        Date Range
      </label>

      <div class="flex">
        <DatePicker
          v-model="refDateRangeStart"
          mode="date"
          :masks="masks"
          :min-date="minStartDate"
          :max-date="maxStartDate"
          :disabled-dates="startDisabledDates"
          :available-dates="startAvailableDates"
        >
          <template #default="{ inputValue, togglePopover }">
            <div
              class="flex flex-col items-center justify-start text-xs sm:flex-row"
              @click="togglePopover"
            >
              <div class="relative flex-grow">
                <img
                  src="../../assets/icons/icon-calendar.svg"
                  alt="icon-calendar"
                  svg-inline
                  class="absolute w-4 h-full mx-2 text-gray-600 pointer-events-none"
                >
                <input
                  class="flex-grow w-full py-1 pl-8 pr-2 bg-gray-100 border rounded"
                  :value="inputValue"
                  data-cy="custom_start_date"
                />
              </div>
            </div>
          </template>
        </DatePicker>
        <span class="flex-shrink-0 m-2">
          <svg
            class="w-4 h-4 text-gray-600 stroke-current"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </span>
        <DatePicker
          v-model="refDateRangeEnd"
          mode="date"
          :masks="masks"
          :min-date="minEndDate"
          :max-date="maxEndDate"
          :disabled-dates="endDisabledDates"
          :available-dates="endAvailableDates"
        >
          <template #default="{ inputValue, togglePopover }">
            <div
              class="flex flex-col items-center justify-start text-xs sm:flex-row"
              @click="togglePopover"
            >
              <div class="relative flex-grow">
                <img
                  src="../../assets/icons/icon-calendar.svg"
                  alt="icon-calendar"
                  svg-inline
                  class="absolute w-4 h-full mx-2 text-gray-600 pointer-events-none"
                >
                <input
                  class="flex-grow w-full py-1 pl-8 pr-2 bg-gray-100 border rounded"
                  :value="inputValue"
                  data-cy="custom_end_date"
                />
              </div>
            </div>
          </template>
        </DatePicker>
      </div>
    </div>

    <div
      v-if="showPeriod"
      class="flex items-center justify-between pt-4 pb-2 text-left center"
    >
      <label class="block text-sm font-semibold uppercase">
        Period
      </label>
      <div class="text-sm leading-none text-right cursor-pointer">
        <select
          v-model="refPeriod"
          class="outline-none"
          data-cy="select_custom_period"
        >
          <option value="Current">
            Current Period
          </option>
          <option value="Period">
            Previous Period
          </option>
          <option value="Month">
            Previous Month
          </option>
          <option value="Year">
            Previous Year
          </option>
        </select>
      </div>
    </div>

    <button
      v-if="refDateRangeStart && refDateRangeEnd && refPeriod"
      type="button"
      class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-tight text-white
              uppercase bg-blue-400 cursor-pointer focus:outline-none hover:opacity-75"
      data-cy="btn_apply_custom_date"
      @click="onApply"
    >
      Apply
    </button>
    <button
      v-else
      type="button"
      class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-tight text-white
             uppercase bg-gray-400"
      data-cy="btn_apply_custom_date"
    >
      Apply
    </button>
  </div>
</template>

<script>
import { getCurrentInstance, ref, watch } from 'vue'
import { DatePicker } from 'v-calendar'

export default {
  name: 'DateRangeForm',

  components: {
    DatePicker
  },

  props: {
    visible: {
      type: Boolean,
      required: false,
      default: true
    },
    showPeriod: {
      type: Boolean,
      required: false,
      default: true,
    },
    dateRangeStart: {
      type: [ Date, null ],
      required: true
    },
    dateRangeEnd: {
      type: [ Date, null ],
      required: true
    },
    period: {
      type: String,
      required: false,
      default: 'Current'
    },
    masks: {
      type:  Object,
      required: false,
      default: () => { return { input: 'YYYY-MM-DD' }}
    },
    minStartDate: {
      type: Date,
      required: false,
      default: null
    },
    maxStartDate: {
      type: Date || String,
      required: false,
      default: null
    },
    minEndDate: {
      type: Date,
      required: false,
      default: null
    },
    maxEndDate: {
      type: Date || String,
      required: false,
      default: null
    },
    startAvailableDates: {
      type: Object,
      required: false,
      default: null
    },
    endAvailableDates: {
      type: Object,
      required: false,
      default: null
    },
    startDisabledDates: {
      type: Object,
      required: false,
      default: null
    },
    endDisabledDates: {
      type: Object,
      required: false,
      default: null
    }
  },

  emits: [
    'update:dateRangeStart',
    'update:dateRangeEnd',
    'update:period',
    'apply'
  ],

  setup(props) {
    const instance = getCurrentInstance()
    const refDateRangeStart = ref(props.dateRangeStart)
    const refDateRangeEnd = ref(props.dateRangeEnd)
    const refPeriod = ref(props.period)

    watch(refDateRangeStart, (val) => {
      if (val) {
        instance.emit('update:dateRangeStart', new Date(val))
      } else {
        instance.emit('update:dateRangeStart', null)
      }
      refDateRangeEnd.value = null
    })

    watch(refDateRangeEnd, (val) => {
      if (val) {
        instance.emit('update:dateRangeEnd', new Date(val))
      } else {
        instance.emit('update:dateRangeEnd', null)
      }
    })

    watch(refPeriod, (val) => {
      instance.emit('update:period', val)
    })

    watch(() => props.dateRangeStart, (val, old) => {
      if (val) {
        if (!old || val.getTime() !== old.getTime()) {
           refDateRangeStart.value = val
        }
      }
    })

    watch(() => props.dateRangeEnd, (val, old) => {
      if (val) {
        if (!old || val.getTime() !== old.getTime()) {
           refDateRangeEnd.value = val
        }
      }
    })

    watch(() => props.period, (val, old) => {
      if (val && val !== old) {
        refPeriod.value = val
      }
    })

    const onApply = () => {
      instance.emit('apply', {
        start: refDateRangeStart.value,
        end: refDateRangeEnd.value,
        period: refPeriod.value,
      })
    }

    return {
      refDateRangeStart,
      refDateRangeEnd,
      refPeriod,
      onApply
    }
  }
}
</script>
