// Copyright Carrefour(2022)
//

import Storage from './Storage'

export default class LocalStorage extends Storage {
  set (key, value) {
    return window.localStorage.setItem(key, value)
  }

  get (key) {
    return window.localStorage.getItem(key)
  }

  del (key) {
    return window.localStorage.removeItem(key)
  }
}
