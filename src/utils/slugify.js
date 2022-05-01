// Copyright Carrefour(2022)
//

import deburr from 'lodash-es/deburr'

export default (string) => {
  return deburr(string).trim().toLowerCase().replace(/ /g, '-').replace(/([^a-zA-Z0-9._-]+)/g, '')
}
