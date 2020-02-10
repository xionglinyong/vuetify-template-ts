const localStorage = window.localStorage

/**
 * 设置或者更新Localstorage
 * @param {String}name 需要设置的属性名称
 * @param {any}item 需要设置的属性值
 */
export function setItem (name: string, item: any) {
  if (!name) throw new Error('name属性是必须的')
  if (!item) throw new Error('item属性是必须的')
  localStorage.setItem(name, JSON.stringify(item))
}

/**
 * 从localstorage中获取值
 * @param {String}name 名称
 * @returns {null|any} 返回对应值，如果没有则返回null
 */
export function getItem (name: string): any {
  if (!name) throw new Error('name属性是必须的')
  const item = localStorage.getItem(name)
  if (item === 'undefined') return null
  return JSON.parse(item as any)
}

/**
 * 删除指定localstorage
 * @param {string}name storage名称
 */
export function rmItem (name: string) {
  if (!name) throw new Error('name属性是必须的')
  localStorage.removeItem(name)
}

/**
 * 移除所有的localstorage
 */
export function clearAllItem () {
  localStorage.clear()
}
