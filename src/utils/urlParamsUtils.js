/**
 * URL 参数与字符串工具
 * 适用于 uni-app 小程序，无外部依赖
 */

const REG_LEADING_QUESTION = /^\?/

/**
 * 对象转换为 URL 查询字符串（不包含前导 ?）
 * @param {Record<string, string | number | boolean>} obj - 键值对象
 * @returns {string} 查询字符串，如 a=1&b=2
 */
export function objToQuery(obj) {
    if (obj === null || typeof obj !== 'object') {
        return ''
    }
    const pairs = []
    for (const key of Object.keys(obj)) {
        if (!Object.hasOwn(obj, key)) {
            continue
        }
        const value = obj[key]
        if (value === undefined || value === null) {
            continue
        }
        const k = encodeURIComponent(String(key))
        const v = encodeURIComponent(String(value))
        pairs.push(`${k}=${v}`)
    }
    return pairs.join('&')
}

/**
 * URL 查询字符串解析为对象（不含 ? 或含 ? 均可）
 * @param {string} queryStr - 查询字符串，如 a=1&b=2 或 ?a=1&b=2
 * @returns {Record<string, string>} 解析后的对象，值为字符串
 */
export function queryToObj(queryStr) {
    if (typeof queryStr !== 'string') {
        return {}
    }
    const str = queryStr.trim().replace(REG_LEADING_QUESTION, '')
    if (!str) {
        return {}
    }
    const result = {}
    const pairs = str.split('&')
    for (const pair of pairs) {
        const idx = pair.indexOf('=')
        if (idx === -1) {
            const k = decodeURIComponent(pair.trim())
            if (k) {
                result[k] = ''
            }
            continue
        }
        const k = decodeURIComponent(pair.slice(0, idx).trim())
        const v = decodeURIComponent(pair.slice(idx + 1).trim())
        if (k) {
            result[k] = v
        }
    }
    return result
}

/**
 * 去掉字符串首尾空格
 * @param {string} str - 原字符串
 * @returns {string} 去空格后的字符串
 */
export function trim(str) {
    if (str === null || str === undefined) {
        return ''
    }
    return String(str).trim()
}
