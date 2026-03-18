/**
 * 常用表单校验工具
 * 适用于 uni-app 小程序，无外部依赖
 */

const REG_MOBILE = /^1\d{10}$/
const REG_EMAIL = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
const REG_AMOUNT = /^(?:0(?:\.\d{1,2})?|[1-9]\d*(?:\.\d{1,2})?)$/
const REG_IDCARD = /^\d{17}[\dX]$/i

/**
 * 中国大陆手机号（1 开头，11 位数字）
 * @param {*} value
 * @returns {boolean} 是否为合法手机号
 */
export function isMobile(value) {
    if (value === undefined || value === null)
        return false
    const s = String(value).trim()
    return REG_MOBILE.test(s)
}

/**
 * 常见邮箱格式
 * @param {*} value
 * @returns {boolean} 是否为合法邮箱
 */
export function isEmail(value) {
    if (value === undefined || value === null)
        return false
    const s = String(value).trim()
    return REG_EMAIL.test(s)
}

/**
 * 金额：允许两位小数，不允许前导 0（0 或 0.xx 允许）
 * @param {*} value
 * @returns {boolean} 是否为合法金额格式
 */
export function isAmount(value) {
    if (value === undefined || value === null)
        return false
    const s = String(value).trim()
    if (s === '')
        return false
    return REG_AMOUNT.test(s)
}

/**
 * 中国大陆 18 位身份证号（含校验码规则）
 * @param {*} value
 * @returns {boolean} 是否为合法身份证号
 */
export function isIDCard(value) {
    if (value === undefined || value === null)
        return false
    const s = String(value).trim()
    if (!REG_IDCARD.test(s))
        return false
    const weight = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    const code = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
    let sum = 0
    for (let i = 0; i < 17; i++) {
        sum += Number(s[i]) * weight[i]
    }
    const last = s[17].toUpperCase()
    return last === code[sum % 11]
}

/**
 * 非空：非 undefined、null、空字符串、纯空格
 * @param {*} value
 * @returns {boolean} 是否非空
 */
export function isRequired(value) {
    if (value === undefined || value === null)
        return false
    if (typeof value === 'string')
        return value.trim() !== ''
    return true
}

/**
 * 长度校验（字符串或数组）
 * @param {string | Array} value
 * @param {{ min?: number, max?: number }} options - min/max 至少传一个
 * @returns {boolean} 是否在长度范围内
 */
export function isLength(value, options = {}) {
    const { min, max } = options
    if (min === undefined && max === undefined)
        return false

    let len
    if (typeof value === 'string') {
        len = value.length
    }
    else if (Array.isArray(value)) {
        len = value.length
    }
    else {
        return false
    }

    if (min !== undefined && len < min)
        return false
    if (max !== undefined && len > max)
        return false
    return true
}

/**
 * 数字范围校验
 * @param {*} value
 * @param {{ min?: number, max?: number }} options
 * @returns {boolean} 是否在范围内
 */
export function isInRange(value, options = {}) {
    const n = Number(value)
    if (Number.isNaN(n))
        return false
    const { min, max } = options
    if (min !== undefined && n < min)
        return false
    if (max !== undefined && n > max)
        return false
    return true
}

/**
 * 整数（含 0、负整数）
 * @param {*} value
 * @returns {boolean} 是否为整数
 */
export function isInteger(value) {
    if (value === undefined || value === null)
        return false
    const n = Number(value)
    return Number.isInteger(n)
}

/**
 * 组合多条规则进行校验，返回第一条不通过的错误信息
 * @param {*} value - 待校验值
 * @param {Array<{ validator: (v: *) => boolean, message: string }>} rules - 规则列表
 * @returns {{ valid: boolean, message?: string }} 校验结果
 */
export function validateForm(value, rules) {
    if (!Array.isArray(rules) || rules.length === 0) {
        return { valid: true }
    }
    for (const rule of rules) {
        const fn = rule.validator || rule.validate
        const msg = rule.message || '校验未通过'
        if (typeof fn !== 'function')
            continue
        if (!fn(value)) {
            return { valid: false, message: msg }
        }
    }
    return { valid: true }
}
