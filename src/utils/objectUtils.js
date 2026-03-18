/**
 * 对象/数组操作工具
 * 适用于 uni-app 小程序，无外部依赖
 */

/**
 * 深拷贝（支持普通对象、数组、Date、基本类型）
 * @param {*} obj - 待拷贝对象
 * @returns {*} 拷贝后的新对象
 */
export function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj
    }
    if (obj instanceof Date) {
        return new Date(obj.getTime())
    }
    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item))
    }
    const result = {}
    for (const key of Object.keys(obj)) {
        if (Object.hasOwn(obj, key)) {
            result[key] = deepClone(obj[key])
        }
    }
    return result
}

/**
 * 合并对象（浅合并，后者覆盖前者同名字段）
 * @param {Record<string, *>} obj1 - 基础对象
 * @param {Record<string, *>} obj2 - 覆盖对象
 * @returns {Record<string, *>} 合并后的新对象
 */
export function mergeObjects(obj1, obj2) {
    if (obj1 === null || typeof obj1 !== 'object') {
        obj1 = {}
    }
    if (obj2 === null || typeof obj2 !== 'object') {
        obj2 = {}
    }
    const result = {}
    for (const key of Object.keys(obj1)) {
        if (Object.hasOwn(obj1, key)) {
            result[key] = obj1[key]
        }
    }
    for (const key of Object.keys(obj2)) {
        if (Object.hasOwn(obj2, key)) {
            result[key] = obj2[key]
        }
    }
    return result
}

/**
 * 数组去重（基本类型按值、引用类型按引用比较）
 * @param {Array<*>} arr - 待去重数组
 * @returns {Array<*>} 去重后的新数组
 */
export function uniqueArray(arr) {
    if (!Array.isArray(arr)) {
        return []
    }
    const seenPrimitive = new Set()
    const seenRef = []
    return arr.filter((item) => {
        if (typeof item === 'object' && item !== null) {
            if (seenRef.includes(item))
                return false
            seenRef.push(item)
            return true
        }
        if (seenPrimitive.has(item))
            return false
        seenPrimitive.add(item)
        return true
    })
}

/**
 * 查找数组元素（第一个满足条件的项）
 * @param {Array<*>} arr - 数组
 * @param {((item: *, index: number, arr: Array<*>) => boolean)} predicate - 断言函数
 * @returns {* | undefined} 找到的元素或 undefined
 */
export function findInArray(arr, predicate) {
    if (!Array.isArray(arr) || typeof predicate !== 'function') {
        return undefined
    }
    for (let i = 0; i < arr.length; i++) {
        if (predicate(arr[i], i, arr)) {
            return arr[i]
        }
    }
    return undefined
}
