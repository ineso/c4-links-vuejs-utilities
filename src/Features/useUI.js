// Copyright Carrefour(2022)
//

import { ref, watch } from 'vue'

const showMenu = ref(false)
const showSidebar = ref(false)
const showInPageHeader = ref(true)
const showExploreBackButton = ref(false)
const summaryFiltersDimensions = ref({ width: 0, height: 0 })

const getObserver = (data) => {
  const observer = new ResizeObserver(entries => {
    const entry = entries[0]

    data.value = {
      width: entry.contentRect.width,
      height: entry.contentRect.height
    }
  })

  return observer
}

/**
 * Returns a set of functions to manage UI.
 * 
 * @return {Object} functions to manage UI.
 */
const useUI = () => {
  const observe = (elem, data = ref({})) => {
    const observer = getObserver(data)
    observer.observe(elem)

    return {
      data,
      unobserve: () => {
        observer.unobserve(elem)
      }
    }
  }

  watch(showInPageHeader, (val) => {
    if (val) {
      showExploreBackButton.value = false
    }
  })

  return {
    summaryFiltersDimensions,
    observe,
    showMenu,
    showSidebar,
    showInPageHeader,
    showExploreBackButton
  }
}

export default useUI
