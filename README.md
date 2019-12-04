# decorator-demo 

  通过decorator特性增强的service层实现demo。
  cd decorator-demo 
  npm install
  npm run dev
  
## 目前已经实现的装饰器功能
```
@cache 
请求数据本地缓存
  
@loading
结合Redux或者Vuex实现请求loading状态控制
 
@operateSuccess
操作成功统一提示
  
@debounce
http请求debounce
  
@notNull
请求参数指定字段非空校验
```


## 使用示例
```
// 校验page参数是否为空
// 统一请求loading状态控制，react中借助redux存储请求状态，Vue可借助vuex。

@notNull('page')
@loading(COMMON_ACTION.LOADING_STATE, 'loading')
async testLoading(params: IloadingParams) {
    try {
        const result = await this.GET<IloadingParams, IloadingResponse>('/demo/testLoading', { params });
        if (result.status === false) {
            return []
        } else {
            return result.data;
        }
    } catch(err) {
    return []
    }
}

```
