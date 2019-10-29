class CacheCenter {
    _cache: Map<string, any>         // 缓存的数据

    constructor() {
        this._cache = new Map();
    }

    // 是否已有缓存
    hasCache(key: string) {
        return this._cache.has(key);
    }

    // 获取缓存数据
    getCache(key: string): any {
        return this._cache.get(key);
    }

    // 设置缓存数据
    setCache(key: string, value: any) {
        this._cache.set(key, value);
    }

    // 清空缓存
    clear() {
        this._cache.clear();
        console.log(this._cache);
    }

    // 删除缓存
    deleteCache(key: string) {
        this._cache.delete(key);
    }

    // 获取缓存大小
    getSize(): number {
        return this._cache.size;
    }
}

export default new CacheCenter();