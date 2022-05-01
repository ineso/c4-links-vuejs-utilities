// Copyright Carrefour(2022)
//

import Storage from './Storage'

export default class Cookie extends Storage {
  set (key, value, options = {}) {
    const name = this.prefix + key
    const maxAge = options.maxAge || 60 * 60 * 24 * 365
    document.cookie = name + '=' + value +
      '; max-age=' + maxAge +
      '; domain=' + window.location.hostname +
      '; path=/'
  }

  get (key) {
    const name = this.prefix + key
    const nameEQ = name + '='
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length)
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length)
      }
    }
    return null
  }

  del (key) {
    const name = this.prefix + key

    this.set(name, '', -1)
  }
}
