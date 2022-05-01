// Copyright Carrefour(2022)
//

import get from 'lodash-es/get'
import map from 'lodash-es/map'
import filter from 'lodash-es/filter'
import mapValues from 'lodash-es/mapValues'
import { makeAPICall } from '../utils'

/**
 * Returns a set of functions to manage looker calls.
 * 
 * @return {Object} functions to manage looker calls.
 */
const useLooker = () => {

  /**
   * Fetch a looker embed URL.
   * 
   * @param {string} url The base url to compute.
   * @return {Promise<Object>} The object containing the embed URL.
   */
  const fetchEmbed = (url) => {
    let fullUrl = '/looker/embed' + url
    fullUrl += (fullUrl.includes('?') ? '&' : '?') + 'embed_domain=' + window.location.origin
    return makeAPICall(fullUrl)
  }

  /**
   * Execute a query from a looker look id.
   * 
   * @param {string} lookId The look identifier.
   * @param {Object} query The query object.
   * @param {string} [format=json] The output expected format.
   * @param {object} [signal=null] The optional signal to intercept.
   * @return {Promise<Object>} The object containing the data result and error.
   */
  const fetchLookData = ({ lookId, query = {}, format = 'json', signal = null }) => {
    const forceFormat = format === 'json'
    let fmt = format

    if (forceFormat) {
      fmt = 'json_detail'
    }

    return makeAPICall('/looker/looks/' + lookId + '/' + fmt,
      {
        method: 'POST',
        body: query,
        signal
      }
    ).then(resp => {
      let data = resp.data
      const errors = get(resp, 'data.errors', null)

      if (forceFormat) {
        data = map(data.data, item => mapValues(item, val => val.value))
      }
      if (errors && Array.isArray(errors) && errors.length > 0) {
        const fatals = map(filter(errors,
          e => Object.prototype.hasOwnProperty.call(e, 'message') &&
            (!Object.prototype.hasOwnProperty.call(e, 'fatal') || e.fatal)
        ), e => e.message)
        if (fatals && fatals.length > 0) {
          throw new Error(fatals[fatals.length - 1])
        }
      }

      return {
        data,
        errors
      }
    })
  }

  /**
   * Return detailed information and configuration about a dashboard.
   * 
   * @param {string} dashboardId The dashboard identifier.
   * @return {Promise<Object>} The object containing the dashboard information.
   */
  const fetchDashboardInfo = ({ dashboardId }) => {
    return makeAPICall('/looker/dashboards/' + dashboardId, {
      method: 'GET'
    })
  }

  /**
   * Return detailed information and configuration about a folder.
   * 
   * @param {string} folderId The folder identifier.
   * @return {Promise<Object>} The object containing the folder information.
   */
  const fetchFolder = ({ folderId }) => {
    return makeAPICall('/looker/folders/' + folderId + '?cache=false', {
      method: 'GET'
    })
  }

  /**
   * Return the list of children folders for a given folder.
   * 
   * @param {string} folderId The folder identifier.
   * @return {Promise<Object[]>} The list of object containing the children folders.
   */
  const fetchFolderChildren = ({ folderId }) => {
    return makeAPICall('/looker/folders/' + folderId + '/children?cache=false', {
      method: 'GET'
    })
  }

  return {
    fetchFolder,
    fetchFolderChildren,
    fetchEmbed,
    fetchLookData,
    fetchDashboardInfo
  }
}

export default useLooker
