// Copyright Carrefour(2022)
//

import map from 'lodash-es/map'
import isString from 'lodash-es/isString'
import isArray from 'lodash-es/isArray'
import { ref } from 'vue'

import { makeAPICall } from '../utils'
import useError from './useError'

const { addError } = useError()

const selectedBookmark = ref(null)
const bookmarks = ref([])

/**
 * Returns a set of functions to manage bookmarks.
 * 
 * @return {Object} functions to manage bookmarks.
 */
const useBookmarks = () => {
  const fetchBookmarksLoading = ref(false)

  /**
   * Load and return bookmarks for the current user.
   * 
   * @return {Promise<Object[]>} The list of returned bookmarks.
   */
  const fetchBookmarks = () => {
    fetchBookmarksLoading.value = true
    return makeAPICall('/bookmarks', {
      method: 'GET'
    }).then(resp => {
      bookmarks.value = map(resp, item => {
        return {
          ...item,
          config: {
            ...item.config,
            region: isArray(item.config.region)
              ? item.config.region : item.config.region && isString(item.config.region)
                ? [item.config.region] : []
          }
        }
      })
      return resp
    }).catch(err => {
      addError({
        message: 'A server error occurred, please retry later or refresh your page.',
        details: err.toString()
      })
    }).then(resp => {
      fetchBookmarksLoading.value = false
      return resp
    })
  }

  const addBookmarkLoading = ref(false)

  /**
   * Add a new bookmark for the current user.
   * 
   * @param {Object} config the object filter linked to the new bookmark.
   * @param {string} name the name of the new bookmark.
   * @param {string} type the type of the new bookmark.
   * @return {Promise<Object>} The object containing the newly created bookmark.
   */
  const addBookmark = ({ config, name, type }) => {
    addBookmarkLoading.value = true
    return makeAPICall('/bookmarks', {
      method: 'POST',
      body: {
        name,
        config,
        type
      }
    }).then(resp => {
      fetchBookmarks()
      return resp
    }).catch(err => {
      addError({
        message: 'A server error occurred, please retry later or refresh your page.',
        details: err.toString()
      })
    }).then(resp => {
      addBookmarkLoading.value = false
      return resp
    })
  }

  const updateBookmarksLoading = ref(false)

  /**
   * Modify an existing bookmark for the current user.
   * 
   * @param {string} id the unique identifier of the existing bookmark.
   * @param {string} name the new name of the existing bookmark.
   * @param {Object} config the object filter linked to the existing bookmark.
   * @param {string} type the type of the existing bookmark.
   * @return {Promise<Object>} The object containing the updated bookmark.
   */
  const updateBookmark = ({ id, name, config, type }) => {
    updateBookmarksLoading.value = true
    return makeAPICall('/bookmarks/' + id, {
      method: 'PUT',
      body: {
        name,
        config,
        type
      }
    }).then(resp => {
      fetchBookmarks()
      return resp
    }).catch(err => {
      addError({
        message: 'A server error occurred, please retry later or refresh your page.',
        details: err.toString()
      })
    }).then(resp => {
      updateBookmarksLoading.value = false
      return resp
    })
  }

  const deleteBookmarksLoading = ref(false)

  /**
   * Delete an existing bookmark for the current user with its unique identifier.
   * 
   * @param {string} id the unique identifier of the existing bookmark.
   * @return {Promise<Object>} The newly created bookmark.
   */
  const deleteBookmark = ({ id }) => {
    deleteBookmarksLoading.value = true
    return makeAPICall('/bookmarks/' + id, {
      method: 'DELETE'
    }).then(resp => {
      fetchBookmarks()
      return resp
    }).catch(err => {
      addError({
        message: 'A server error occurred, please retry later or refresh your page.',
        details: err.toString()
      })
    }).then(resp => {
      deleteBookmarksLoading.value = false
      return resp
    })
  }

  return {
    selectedBookmark,
    bookmarks,
    fetchBookmarksLoading,
    fetchBookmarks,
    addBookmarkLoading,
    addBookmark,
    updateBookmarksLoading,
    updateBookmark,
    deleteBookmarksLoading,
    deleteBookmark
  }
}

export default useBookmarks
