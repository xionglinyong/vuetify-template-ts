import { getItem, rmItem, setItem } from '@/utils/localstorage'
import { UserInfo } from '@/interface/user'
import { Menus } from '@/interface/permission'

// token名称
const tokenName = 'LOGIN_TOKEN'
const refreshTokenName = 'REFRESH_TOKEN'
const userInfoName = 'USER_INFO'
const userMenuName = 'USER_MENU'

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
  return getItem(userInfoName)
}

export function setUserInfo (user: object): void {
  setItem(userInfoName, user)
}

export function deleteUserInfo (): void {
  rmItem(userInfoName)
}

export function getUserMenu (): Array<Menus> {
  return getItem(userMenuName)
}

export function setUserMenu (menus: Array<Menus>): void {
  setItem(userMenuName, menus)
}

export function deleteUserMenu (): void {
  rmItem(userMenuName)
}
