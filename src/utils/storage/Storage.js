// Copyright Carrefour(2022)
//

export default class Storage {
  set (_key, _value) {
    throw new Error('set should be redefined')
  }

  get (_key) {
    throw new Error('get should be redefined')
  }

  del (_key) {
    throw new Error('del should be redefined')
  }
}
