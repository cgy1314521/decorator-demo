/**
 * 合并请求中间件
 * @param funcs 多个中间件函数
 */
function compose(...funcs: ((...params: any) => any)[]): any {
    if (funcs.length === 0) {
        return (arg: any) => arg
    }
    if (funcs.length === 1) {
        return funcs[0]
    }

    return funcs.reduce((combineFunc: Function, currentFunc: Function) => {
        return (...args: any[]) => {
            return combineFunc(currentFunc(...args));
        }
    });
}

export default compose;