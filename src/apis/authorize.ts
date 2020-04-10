import { APIS } from '@/interface/api'
import { LoginUser } from '@/interface/user'
import { RequestMethod } from '@/interface/enum'

const urlHead = '/api/Authorize'
const apis: APIS = {
  login: {
    url: `${urlHead}/Login`,
    method: RequestMethod.post
  },
  refreshToken: {
    url: `${urlHead}/RefreshToken/RefreshToken`,
    method: RequestMethod.post
  },
  getUserInfoByToken: {
    url: `${urlHead}/Get/Get`,
    method: RequestMethod.get
  }
}

export async function login (data: LoginUser) {
  return window.axios({
    url: apis.login.url,
    method: apis.login.method,
    data
  })
}

export async function refreshToken (data: {
  clientId?: string;
  clientSecret?: string;
  refreshToken: string;
}) {
  return window.axios({
    url: apis.refreshToken.url,
    method: apis.refreshToken.method,
    data
  })
}

export async function getUserInfoByToken () {
  return window.axios({
    url: apis.getUserInfoByToken.url,
    method: apis.getUserInfoByToken.method
  })
}
