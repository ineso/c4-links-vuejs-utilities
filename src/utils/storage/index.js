// Copyright Carrefour(2022)
//

import Cookie from './Cookie'
import LocalStorage from './LocalStorage'

const isLocalStorageSupported = () => {
  const item = 'test'
  try {
    window.localStorage.setItem(item, item)
    window.localStorage.removeItem(item)
    return true
  } catch (e) {
    return false
  }
}

const type = isLocalStorageSupported() ? 'localStorage' : 'cookie'

if (!['localStorage', 'cookie'].includes(type)) {
  throw new Error('Storage type should be: localStorage or cookie')
}

let storageTypes = {
  localStorage: new LocalStorage(),
  cookie: new Cookie()
}

storageTypes = Object.assign(storageTypes[type], storageTypes)

export default storageTypes
