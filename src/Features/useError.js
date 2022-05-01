// Copyright Carrefour(2022)
//

import { ref, computed } from 'vue'

const error = ref([])

/*
 * @typedef {(Object|string)} ErrorsLike
 */

/**
 * Add a new error.
 * 
 * @param {Error|string} err A new error or a new error message to keep. 
 */
const addError = (err) => {
  if (err && typeof err === 'string') {
    error.value.push({
      message: err,
      details: null
    })
    return true
  } else if (err && typeof err === 'object') {
    if (Array.isArray(err)) {
      err.forEach(e => addError(e))
      return true
    } else if (err.message) {
      error.value.push({
        message: err.message,
        details: err.details || ''
      })
      return true
    }
  }
  return false
}

/**
 * Empty the error list (array).
 * 
 */
const clearError = () => {
  error.value = []
}

/**
 * Return true if at least one error exist in the saved list.
 * 
 * @returns {boolean}
 */
const isError = computed(() => {
  if (error.value && error.value.length > 0) {
    return true
  }
  return false
})

/**
 * Return the last added error in the saved list.
 * 
 * @returns {Error|string}
 */
const lastError = computed(() => {
  return error.value.length > 0 ? error.value[error.value.length - 1] : null
})

/**
 * Return the array of all saved errors.
 * 
 * @returns {ErrorsLike[]} the array of errors.
 */
const allErrors = computed(() => {
  return error.value.map(e => {
    return e.details && e.details.length > 0 ? e.details : e.message
  }).join(', ')
})

/**
 * Returns a set of functions to manage errors.
 * 
 * @return {Object} functions to manage errors.
 */
const useError = () => {

  return {
    addError,
    clearError,
    isError,
    lastError,
    allErrors
  }
}

export default useError
