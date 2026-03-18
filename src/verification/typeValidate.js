/**
 * 基础类型校验工具
 * 适用于 uni-app 小程序，无外部依赖
 */

/**
 * 是否为字符串
 * @param {*} value
 * @returns {boolean} 是否为字符串类型
 */
export function isString(value) {
    return typeof value === 'string'
}

/**
 * 是否为数字（含 NaN 判断，NaN 不算有效数字）
 * @param {*} value
 * @returns {boolean} 是否为有效数字
 */
export function isNumber(value) {
    return typeof value === 'number' && !Number.isNaN(value)
}

/**
 * 是否为布尔值
 * @param {*} value
 * @returns {boolean} 是否为布尔类型
 */
export function isBoolean(value) {
    return typeof value === 'boolean'
}

/**
 * 是否为数组
 * @param {*} value
 * @returns {boolean} 是否为数组
 */
export function isArray(value) {
    return Array.isArray(value)
}

/**
 * 是否为普通对象（typeof === 'object' 且非 null、非数组）
 * @param {*} value
 * @returns {boolean} 是否为普通对象
 */
export function isObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value)
}

/**
 * 是否为函数
 * @param {*} value
 * @returns {boolean} 是否为函数
 */
export function isFunction(value) {
    return typeof value === 'function'
}
