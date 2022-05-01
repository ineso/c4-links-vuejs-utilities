import { htmlEncode } from '../utils'

test('useError', () => {

  let res = htmlEncode('this is javascript injecttion <script>window.alert(\'test\')</script>')
  expect(res).toEqual('this is javascript injecttion &lt;script&gt;window.alert(&#39;test&#39;)&lt;/script&gt;')

  res = htmlEncode('¢')
  expect(res).toEqual('&cent;')

  res = htmlEncode('£')
  expect(res).toEqual('&pound;')

  res = htmlEncode('¥')
  expect(res).toEqual('&yen;')

  res = htmlEncode('€')
  expect(res).toEqual('&euro;')

  res = htmlEncode('©')
  expect(res).toEqual('&copy;')

  res = htmlEncode('®')
  expect(res).toEqual('&reg;')

  res = htmlEncode('<')
  expect(res).toEqual('&lt;')

  res = htmlEncode('>')
  expect(res).toEqual('&gt;')

  res = htmlEncode('"')
  expect(res).toEqual('&quot;')

  res = htmlEncode('&')
  expect(res).toEqual('&amp;')

  res = htmlEncode('\'')
  expect(res).toEqual('&#39;')
})