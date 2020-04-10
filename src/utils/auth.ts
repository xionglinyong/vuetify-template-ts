import { getItem, rmItem, setItem } from '@/utils/localstorage'
import { UserInfo } from '@/interface/user'

// token名称
const tokenName = 'LOGIN_TOKEN'
const refreshTokenName = 'REFRESH_TOKEN'
const USER_INFO_NAME = 'USER_INFO'

export function getToken (): string {
  return getItem(tokenName)
}

export function setToken (token: string): void {
  setItem(tokenName, token)
}

export function deleteToken (): void {
  rmItem(tokenName)
}

export function getRefreshToken (): string {
  return getItem(refreshTokenName)
}

export function setRefreshToken (token: string): void {
  setItem(refreshTokenName, token)
}

export function deleteRefreshToken (): void {
  rmItem(refreshTokenName)
}

export function getUserInfo (): UserInfo {
  return getItem(USER_INFO_NAME)
}

export function setUserInfo (user: object): void {
  setItem(USER_INFO_NAME, user)
}

export function deleteUserInfo (): void {
  rmItem(USER_INFO_NAME)
}
