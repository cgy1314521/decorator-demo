import { message } from 'antd';

const toString = Object.prototype.toString;

const isUnDef = (i: any): boolean => {
    if (toString.apply(i) === '[object Undefined]' || toString.apply(i) === '[object Null]') {
        return true;
    } else {
        return false;
    }
}

/**
 * 中后台应用中操作成功统一提示
 * @param target 
 * @param name 
 * @param descriptor 
 */
export const operateSuccess = (target: any, name: string, descriptor: any) => {
    const oldValue = descriptor.value;
    descriptor.value = async function(this: any, ...args: any) {
        const result = await oldValue.apply(this, args);

        // 如果请求status为true，说明操作成功
        if (result.status === true) {
            message.success('操作成功');
        }
        return result;
    }
}

/**
 * 控制http请求在持续触发的情况下只执行最后一次
 * @param delay 
 * @param immediate 
 */
export const debounce = (delay: number, immediate: boolean = true) => {
    let timer: any = undefined;
    return (target: any, name: string, descriptor: any) => {

        const oldValue = descriptor.value;

        descriptor.value = async function(this: any, ...args: any) {

            const promise = new Promise((resolve) => {

                // 创建并返回一个定时器对象
                const createTimer = () => {
                    return setTimeout(async () => {
                        const result = await oldValue.apply(this, args);
                        resolve(result);
                    }, delay);
                }

                if (timer) {
                    clearTimeout(timer);
                    timer = createTimer();
                } else {
                    timer = createTimer();
                }
            })
            return promise;
        }
    }
}

/**
 * 控制http请求某些参数不能为空
 * @param args 参数字段的key
 */
export const notNull = (...keys: string[]) => {

    return (target: any, name: string, descriptor: any) => {

        const oldValue = descriptor.value;
        
        descriptor.value = async function(this: any, ...args: any) {

            // 默认请求方法的第一个参数为请求参数
            const params = args[0];
            console.log(args, params);
            if (toString.apply(params) !== '[object Object]') {
                throw TypeError('请求参数必须是对象类型');
            } else {
                for (let key of keys) {
                    if (isUnDef(params[key])) {
                        throw TypeError(`请求${ name }中的参数字段${ key }为空，请仔细查验`);
                    }
                }

                const result = await oldValue.apply(this, params);

                return result;
            }
        }
    }
}