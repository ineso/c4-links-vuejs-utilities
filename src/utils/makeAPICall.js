// Copyright Carrefour(2022)
//

import each from 'lodash-es/each'
import storage from './storage'

const makeAPIFetch = (endpoint, params, options) => {
  const authToken = storage.cookie.get('Carrefour-accessToken')
  if (!authToken && options.catch498) {
    return Promise.resolve({ status: 498 })
  }
  return fetch(process.env.VUE_APP_API_BASE_URL + endpoint, {
    ...params,
    body: params.body ? JSON.stringify(params.body) : null,
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: authToken,
      ...params.headers || {}
    })
  })
}

/**
 * Performs an Ajax internal API call.
 * 
 * @param {string} endpoint the API call endpoint.
 * @param {Object} [params={}] optinal parameters.
 * @param {boolean} [catch498=true] optional parameter to refresh token is necessary.
 * @returns {Promise<Object|Object[]>} the output data from the API call.
 */
const makeAPICall = (endpoint, params = {}, { catch498 = true } = {}) => {
  return makeAPIFetch(endpoint, params, { catch498 }).then(response => {
    const refreshToken = storage.cookie.get('Carrefour-refreshToken')
    if (catch498 && response.status === 498 && refreshToken) {
      return makeAPICall('/oidc/refresh', {
        method: 'POST',
        headers: {
          Authorization: refreshToken
        }
      }, { catch498: false }).then(data => {
        if (data.accessToken) {
          each(['accessToken', 'refreshToken'], type => {
            if (data[type]) {
              storage.cookie.set(
                [data.instanceId, type].join('-'),
                data[type].token,
                { maxAge: data[type].maxAge / 1000 }
              )
            }
          })

          return makeAPICall(endpoint, params, { catch498: false })
        }

        return Promise.reject(response)
      })
    }
    if (response.ok) {
      return response.json()
    }
    return Promise.reject(response)
  })
}

export default makeAPICall
