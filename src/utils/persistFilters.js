// Copyright Carrefour(2022)
//

import isArray from 'lodash-es/isArray'
import isString from 'lodash-es/isString'
import storage from './storage'

/**
 * Load an object filters from storage with its name.
 * 
 * @param {string} name the key name of the filter to load.
 * @returns {Object} the object filter or an empty object.
 */
const loadFilters = (name) => {
  if (!name) {
    return {}
  }
  try {
    const filters = window.JSON.parse(storage.cookie.get(name)) || {}
    filters.region = isArray(filters.region)
      ? filters.region
      : filters.region && isString(filters.region)
        ? [filters.region]
        : []
    return filters
  } catch (err) {
    return {}
  }
}

/**
 * Save an object filters to storage.
 * 
 * @param {string} name the key name of the filter to save.
 * @param {Object} filters the object filters.
 */
const saveFilters = (name, filters) => {
  if (!name) {
    return
  }
  try {
    if (filters) {
      storage.cookie.set(name, window.JSON.stringify(filters))
    }
  } catch (err) {
    // nothing to do: ignore
  }
}

const persistFilters = {
  loadFilters,
  saveFilters
}

export default persistFilters
