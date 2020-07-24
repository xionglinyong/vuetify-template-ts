/**
 *
 *格式化日期
 * @param {Date|Number|String}time 传入的时间
 * @param {String}format 日期格式，如‘yyyy-mm-dd hh:mm:ss’等
 * @returns {string} 返回格式化之后的字符串
 */
export function dateFormat (time = new Date(), format = 'yyyy-MM-dd hh:mm:ss') {
  if (typeof time === 'number' || typeof time === 'string') {
    time = new Date(+time)
  } else if (!(time instanceof Date)) {
    throw new Error('第一个参数必须是Number或者Date类型')
  }

  // 用于循环匹配正则
  const regObj: any = {
    'M+': time.getMonth() + 1,
    'd+': time.getDate(),
    'h+': time.getHours(),
    'm+': time.getMinutes(),
    's+': time.getSeconds()
  }

  // 利用正则表达式匹配年格式的字符串，并将格式化字符串替换
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${time.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (const reg in regObj) {
    if (new RegExp(`(${reg})`).test(format)) {
      const dataStr = regObj[reg] >= 10 ? regObj[reg] : RegExp.$1.length === 1 ? regObj[reg] : `0${regObj[reg]}`
      format = format.replace(RegExp.$1, dataStr)
    }
  }
  return format
}
