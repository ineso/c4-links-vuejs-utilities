/* eslint-disable no-console */

import each from 'lodash-es/each'
import get from 'lodash-es/get'
import { ref, computed } from 'vue'
import { storage, makeAPICall } from '../utils'

const user = ref({})
const fetchUserLoading = ref(false)
const isLogged = computed(() => user.value && Object.keys(user.value).length > 0)

/**
 * Returns a set of functions to manage user.
 * 
 * @return {Object} functions to manage user.
 */
const useUser = () => {

  /**
   * Logout the current user, redirect to the logout page
   * and clear session cookies.
   */
  const logout = () => {
    const accessToken = storage.cookie.get('Carrefour-accessToken')
    storage.cookie.del('Carrefour-accessToken')
    storage.cookie.del('Carrefour-refreshToken')

    window.location.href = process.env.VUE_APP_API_BASE_URL +
      '/oidc/logout?authorization=' +
      accessToken
  }

  /**
   * Login the current user, redirect to the login page
   * 
   */
  const login = () => {
    window.location.href = process.env.VUE_APP_API_BASE_URL + '/oidc/login'
  }

  /**
   * Fetch the user information and credentials.
   * 
   * @returns {Promise<Object>} the user credentials.
   */
  const fetchUser = () => {
    fetchUserLoading.value = true

    return makeAPICall('/me', {
      method: 'GET'
    }).catch(err => {
      console.warn(err)
    }).then(resp => {
      return resp
    }).finally(() => {
      fetchUserLoading.value = false
    })
  }

  /**
   * Returns the user information and credentials.
   * If not already in cache call the fetch function.
   * 
   * @returns {Promise<Object>} the user credentials.
   */
  const getUser = async () => {
    if (!isLogged.value) {
      try {
        const response = await fetchUser()
        user.value = get(response, 'data', {})
      } catch (err) {
        console.warn(err)
      }
    }

    return user.value
  }

  /**
   * Manage session cookies when auth redirection is done.
   * 
   * @param {string} token the token to save.
   */
  const handleTokenReply = ({ token }) => {
    const data = window.JSON.parse(window.atob(token))

    each(['accessToken', 'refreshToken'], type => {
      if (data[type]) {
        storage.cookie.set(
          [data.instanceId, type].join('-'), data[type].token, { maxAge: data[type].maxAge / 1000 }
        )
      }
    })
    window.location.href = window.location.origin + window.location.pathname
  }

  return {
    logout,
    login,
    handleTokenReply,
    getUser,
    isLogged,
    user,
    fetchUserLoading
  }
}

export default useUser
