// Copyright Carrefour(2022)
//

import each from 'lodash-es/each'
import useFilters from './useFilters'

const { confirmedFiltersDisplay } = useFilters()

/**
 * Returns a set of functions to manage gtm events.
 * 
 * @return {Object} functions to manage gtm events.
 */
const useEvents = ({ gtm } = {}) => {

  /**
   * Send an event to the gtm (Google Tag Manager)
   * 
   * @param {Object} event the new event to send.
   * @param {string} category the category name.
   * @param {string[]} [fields=[]] the array of fields.
   * @param {Object} [overrides={}] the overrides.
   * 
   */
  const sendEvents = ({ event, category, fields = [], overrides = {} } = {}) => {
    if (gtm) {
      each(confirmedFiltersDisplay.value, item => {
        if (item.value !== 'N/A' &&
          item.value !== 'All' &&
          (!fields.length || fields.includes(item.key))
        ) {
          gtm.trackEvent({
            event,
            category,
            action: item.type,
            label: overrides[item.key] || item.value
          })
        }
      })
    }
  }

  return {
    sendEvents,
  }
}

export default useEvents
