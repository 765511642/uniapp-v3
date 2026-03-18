/**
 * 小程序本地缓存工具（基于 uni Storage）
 * 适用于 uni-app 小程序，无外部依赖；值会序列化存储，支持字符串、数字、布尔、对象、数组
 */

/**
 * 设置缓存（支持字符串、数字、布尔、对象、数组，内部会序列化）
 * @param {string} key - 缓存键
 * @param {string | number | boolean | object | Array | null} value - 缓存值；若为 undefined 则删除该键
 */
export function setItem(key, value) {
    if (key === undefined || key === null) {
        return
    }
    const k = String(key)
    if (value === undefined) {
        uni.removeStorageSync(k)
        return
    }
    const str = typeof value === 'string' ? value : JSON.stringify(value)
    uni.setStorageSync(k, str)
}

/**
 * 获取缓存，不存在或解析失败时返回 null
 * @param {string} key - 缓存键
 * @returns {string | number | boolean | object | Array | null} 缓存值或 null
 */
export function getItem(key) {
    if (key === undefined || key === null) {
        return null
    }
    try {
        const str = uni.getStorageSync(String(key))
        if (str === undefined) {
            return null
        }
        try {
            return JSON.parse(str)
        }
        catch {
            return str
        }
    }
    catch {
        return null
    }
}

/**
 * 删除指定键的缓存
 * @param {string} key - 缓存键
 */
export function removeItem(key) {
    if (key === undefined || key === null) {
        return
    }
    try {
        uni.removeStorageSync(String(key))
    }
    catch {}
}

/**
 * 清空当前小程序下所有本地缓存
 */
export function clearStorage() {
    try {
        uni.clearStorageSync()
    }
    catch {}
}
