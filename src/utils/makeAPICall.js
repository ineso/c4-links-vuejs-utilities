// Copyright Carrefour(2022)
//

const makeAPIFetch = (endpoint, params, options) => {
  return fetch(process.env.VUE_APP_API_BASE_URL + endpoint, {
    ...params,
    credentials: 'include',
    body: params.body ? JSON.stringify(params.body) : null,
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
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
    if (response.ok) {
      return response.json()
    }
    return Promise.reject(response)
  })
}

export default makeAPICall

