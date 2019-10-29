import store from '../../store';

/**
 * 配合redux或vuex做网络请求状态管理
 */
export function loading(type: string, key: string) {
    return (target: any, name: any, descriptor: any) => {
        const oldValue = descriptor.value;
        let payload: any = {};
        descriptor.value = async function(this: any, ...args:any) {
            payload[key] = true;
            store.dispatch({
                type: type,
                payload
            });
            const result = await oldValue.apply(this, args);
            payload[key] = false;
            store.dispatch({
                type: type,
                payload
            });
            return result;
        } 
        return descriptor;
    }
}