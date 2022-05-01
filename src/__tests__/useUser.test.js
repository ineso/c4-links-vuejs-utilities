/**
 * @jest-environment jsdom
 */
/* eslint-disable  no-console, no-undefined */

import useUser from '../features/useUser'
import { makeAPICall } from '../utils'

jest.setTimeout(30000) // 30 seconds

jest.mock('../utils/makeAPICall')

global.window = Object.create(window)
const url = "http://dummy.com"
Object.defineProperty(window, "location", {
  value: {
    href: url
  },
  writable: true
})

const data = {
  data: {
    jwt: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
      payload: {
        _generatedAt: 1645618492034,
        accessToken: "ee15f5d6-801e-45ce-b722-43505c1ec95b",
        sub: "unilever_thiebaut"
      },
      config: {
        maxAge: 5184000000,
        expiresIn: 2592000000
      }
    },
    oidc: {
      dwexternalcompany: ["UNILEVER"],
      sub: "unilever_thiebaut",
      Gntguid: "0001g43vnt7i02od",
      name: "THIEBAUT Unilever",
      given_name: "Unilever",
      family_name: "THIEBAUT",
      fr_datashopper: ["explorer"],
      email: "unilever_thiebaut@sawext.carrefour.com",
      tokenSet: {
        access_token: "ee15f5d6-801e-45ce-b722-43505c1ec95b",
        refresh_token: "5a3c631c-f023-4bbd-84c6-a8dd181661db",
        scope: "externalcompany openid profile fr_datashopper email",
        id_token: "eyAidHlwIjogIkpXVCIsICJraWQiOiAibm",
        token_type: "Bearer",
        expires_at: 1645622090
      }
    },
    internal: {
      store: true,
      competition: true,
      customCategory: false,
      scoreCard: true,
      sftp: true
    },
    datashopper: {
      active: true,
      company: "UNILEVER",
      holding: "UNILEVER",
      countries: {
        BEL: "Belgium",
        BRA: "Brazil",
        ESP: "Spain",
        FRA: "France",
        ITA: "Italy",
        POL: "Poland"
      },
      permissions: ["Store", "Competition"]
    },
    canAccessDatashopper: true,
    canAccessScoreCard: true,
    canSendToSFTP: true,
    canExplore: true,
    pos_g40: {
      active: true,
      company: "UNILEVER",
      holding: "UNILEVER",
      countries: {
        BEL: "Belgium",
        CHN: "China",
        FRA: "France",
        ITA: "Italy",
      },
      permissions: ["Competition"]
    },
    pos_g9_std_weekly: {
      active: true,
      company: "UNILEVER",
      holding: "UNILEVER",
      countries: {
        ARG: "Argentina",
        BEL: "Belgium",
        BRA: "Brazil",
        ESP: "Spain",
      },
      permissions: []
    },
    pos_g9_sbs_weekly: {
      active: false,
      company: "UNILEVER",
      holding: "UNILEVER",
      countries: {
        ARG: "Argentina",
        BEL: "Belgium",
        BRA: "Brazil",
        ESP: "Spain",
      },
      permissions: []
    },
    pos_g9_sbs_monthly: {
      active: false,
      company: "UNILEVER",
      holding: "UNILEVER",
      countries: {
        BEL: "Belgium",
        BRA: "Brazil",
        ESP: "Spain",
        FRA: "France",
      },
      permissions: []
    },
    lookerUserId: 94,
    lookerPersonalFolder: 107,
    lookerSharedFolder: 199
  }
}

test('getUser(sucess)', async () => {
  jest.resetAllMocks()
  makeAPICall.mockResolvedValue(data)

  const { getUser, user } = useUser()

  user.value = {}
  let resp = await getUser()
  console.log('resp=', resp)
  expect(resp).toEqual({
    jwt: {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      payload: {
        _generatedAt: 1645618492034,
        accessToken: 'ee15f5d6-801e-45ce-b722-43505c1ec95b',
        sub: 'unilever_thiebaut'
      },
      config: { maxAge: 5184000000, expiresIn: 2592000000 }
    },
    oidc: {
      dwexternalcompany: ['UNILEVER'],
      sub: 'unilever_thiebaut',
      Gntguid: '0001g43vnt7i02od',
      name: 'THIEBAUT Unilever',
      given_name: 'Unilever',
      family_name: 'THIEBAUT',
      fr_datashopper: ['explorer'],
      email: 'unilever_thiebaut@sawext.carrefour.com',
      tokenSet: {
        access_token: 'ee15f5d6-801e-45ce-b722-43505c1ec95b',
        refresh_token: '5a3c631c-f023-4bbd-84c6-a8dd181661db',
        scope: 'externalcompany openid profile fr_datashopper email',
        id_token: 'eyAidHlwIjogIkpXVCIsICJraWQiOiAibm',
        token_type: 'Bearer',
        expires_at: 1645622090
      }
    },
    internal: {
      store: true,
      competition: true,
      customCategory: false,
      scoreCard: true,
      sftp: true
    },
    datashopper: {
      active: true,
      company: 'UNILEVER',
      holding: 'UNILEVER',
      countries: {
        BEL: 'Belgium',
        BRA: 'Brazil',
        ESP: 'Spain',
        FRA: 'France',
        ITA: 'Italy',
        POL: 'Poland'
      },
      permissions: ['Store', 'Competition']
    },
    canAccessDatashopper: true,
    canAccessScoreCard: true,
    canSendToSFTP: true,
    canExplore: true,
    pos_g40: {
      active: true,
      company: 'UNILEVER',
      holding: 'UNILEVER',
      countries: { BEL: 'Belgium', CHN: 'China', FRA: 'France', ITA: 'Italy' },
      permissions: ['Competition']
    },
    pos_g9_std_weekly: {
      active: true,
      company: 'UNILEVER',
      holding: 'UNILEVER',
      countries: { ARG: 'Argentina', BEL: 'Belgium', BRA: 'Brazil', ESP: 'Spain' },
      permissions: []
    },
    pos_g9_sbs_weekly: {
      active: false,
      company: 'UNILEVER',
      holding: 'UNILEVER',
      countries: { ARG: 'Argentina', BEL: 'Belgium', BRA: 'Brazil', ESP: 'Spain' },
      permissions: []
    },
    pos_g9_sbs_monthly: {
      active: false,
      company: 'UNILEVER',
      holding: 'UNILEVER',
      countries: { BEL: 'Belgium', BRA: 'Brazil', ESP: 'Spain', FRA: 'France' },
      permissions: []
    },
    lookerUserId: 94,
    lookerPersonalFolder: 107,
    lookerSharedFolder: 199
  })

  resp = await getUser()
  console.log('resp=', resp)
})

test('getUser(fail)', async () => {
  jest.resetAllMocks()
  makeAPICall.mockRejectedValueOnce(new Error('500: Server Error'))

  const { getUser, user } = useUser()

  user.value = {}
  const resp = await getUser()
  console.log('resp=', resp)
  expect(resp).toEqual({})
})

test('login', () => {
  jest.resetAllMocks()

  const { login } = useUser()

  login()
})

test('login', () => {
  jest.resetAllMocks()

  const { logout } = useUser()

  logout()
})
