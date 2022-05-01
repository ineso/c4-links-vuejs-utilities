// Copyright Carrefour(2022)
//

const escapeChars = {
  '¢': 'cent',
  '£': 'pound',
  '¥': 'yen',
  '€': 'euro',
  '©': 'copy',
  '®': 'reg',
  '<': 'lt',
  '>': 'gt',
  '"': 'quot',
  '&': 'amp',
  '\'': '#39'
}

let regexString = '['
for (const key in escapeChars) {
  regexString += key
}
regexString += ']'

export default (str) => {
  const regex = new RegExp(regexString, 'g')
  return str.replace(regex, function (m) {
    return '&' + escapeChars[m] + ';'
  })
}