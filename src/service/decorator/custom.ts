import { message } from 'antd';

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