/**
 * 基础工具函数 - 事件控制（防抖、节流、只执行一次）
 * 适用于 uni-app 小程序，无外部依赖
 */

/**
 * 防抖：在 delay 内多次触发只执行最后一次
 * @param {Function} fn - 要执行的函数
 * @param {number} delay - 延迟毫秒数
 * @returns {Function} 防抖后的函数
 */
export function debounce(fn, delay) {
    if (typeof fn !== 'function' || typeof delay !== 'number' || delay < 0) {
        return fn
    }
    let timer = null
    return function _debounced(...args) {
        if (timer)
            clearTimeout(timer)
        timer = setTimeout(() => {
            timer = null
            fn.apply(this, args)
        }, delay)
    }
}

/**
 * 节流：在 interval 内最多执行一次
 * @param {Function} fn - 要执行的函数
 * @param {number} interval - 间隔毫秒数
 * @returns {Function} 节流后的函数
 */
export function throttle(fn, interval) {
    if (typeof fn !== 'function' || typeof interval !== 'number' || interval <= 0) {
        return fn
    }
    let last = 0
    return function _throttled(...args) {
        const now = Date.now()
        if (now - last >= interval) {
            last = now
            fn.apply(this, args)
        }
    }
}

/**
 * 只执行一次：多次调用仅第一次会执行
 * @param {Function} fn - 要执行的函数
 * @returns {Function} 包装后的函数
 */
export function once(fn) {
    if (typeof fn !== 'function') {
        return fn
    }
    let called = false
    return function _once(...args) {
        if (called)
            return
        called = true
        return fn.apply(this, args)
    }
}
