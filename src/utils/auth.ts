import { getItem, rmItem, setItem } from '@/utils/localstorage'

// token名称
const tokenName = 'LOGIN_TOKEN'

export function getToken (): string {
  return getItem(tokenName)
}

export function setToken (token: string): void {
  setItem(tokenName, token)
}

export function deleteToken (): void {
  rmItem(tokenName)
}
