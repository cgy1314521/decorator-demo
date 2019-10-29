import { cacheCenter } from '../util';

/**
 * 数据缓存装饰器
 * @param key 缓存数据key值
 */
export function cache(key: string) {
    return (target: any, name: any, descriptor: any) => {
        const oldValue = descriptor.value;
        descriptor.value = async function(this: any, ...args:any) {
            // 获取缓存数据 
            const cacheValue = cacheCenter.getCache(key);
            if (cacheValue) {

                // 返回深拷贝后的数据，避免直接操作数据，导致数据被误修改
                return JSON.parse(JSON.stringify(cacheValue));
            }
            const result = await oldValue.apply(this, args);

            // 设置缓存
            cacheCenter.setCache(key, result);
            return result;
        } 
        return descriptor;
    }
}

/**
 * 清除指定缓存装饰器
 * @param key 缓存数据key值
 */
export function deleteCache(key: string) {
    return (target: any, name: any, descriptor: any) => {
        const oldValue = descriptor.value;
        descriptor.value = async function(this: any, ...args: any) {

            // 清除指定缓存
            cacheCenter.deleteCache(key);
            const result = await oldValue.apply(this, args);
            return result;
        }
        return descriptor;
    }
    
}

/**
 * 清空缓存装饰器
 */
export function clear() {
    return (target: any, name: any, descriptor: any) => {
        const oldValue = descriptor.value;
        descriptor.value = async function(this: any, ...args: any) {

            // 清除缓存
            cacheCenter.clear();
            const result = await oldValue.apply(this, args);
            return result;
        }
        return descriptor;
    }
}