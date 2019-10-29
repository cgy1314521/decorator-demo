import axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance } from 'axios';
import { message } from 'antd';
import { compose } from './util/index';

// 自定义请求头字段
interface IcommonHeader {
    [propName: string]: any
}

interface IplainObject {
    [propName: string]: any
}

class BaseHttp {
    
    static $$http: AxiosInstance        // 单例模式
    static baseUrl: string = ''         // http请求路径
    static timeout: number = 30000      // http请求超时时间
    static headers: IcommonHeader = {
        'content-type': 'application/json; charset=utf-8'
    }

     /**
     * 用于修改默认请求头设置
     * @param object 一个纯对象
     */
    static setHeader(object: IplainObject) {
        Object.keys(object).forEach((key) => {
            const value = object[key]; 
            BaseHttp.$$http.defaults.headers[key] = value;
        });
    }

    // 构造函数
    constructor() {
        // 创建axios实例
        if (!BaseHttp.$$http) {
            BaseHttp.$$http = axios.create({
                baseURL: BaseHttp.baseUrl,
                timeout: BaseHttp.timeout,
                headers: BaseHttp.headers
            });   

            // 注入的Interceptors执行顺序为从右至左
            this.useResponseInterceptors(this.errorInterceptor, this.dataFilterInterceptor, this.tokenInterceptor);
            this.useRequestInterceptors(this.paramsFilterInterceptor);
        }   
    }

    /**
     * 添加request拦截器
     * @param interceptors 拦截器方法
     */
    useRequestInterceptors(...interceptors: ((req: AxiosRequestConfig) => AxiosRequestConfig)[]) {
        const requestInterceptors = compose(...interceptors);
        BaseHttp.$$http.interceptors.request.use(requestInterceptors);
    }

    /**
     * 添加response拦截器
     * @param interceptors 拦截器方法
     */
    useResponseInterceptors(...interceptors:  ((res: AxiosResponse) => AxiosResponse)[]) {
        const responseInterceptors = compose(...interceptors);
        BaseHttp.$$http.interceptors.response.use(responseInterceptors);
    }

    /**
     * token拦截器
     * @param res http请求返回
     */
    tokenInterceptor = (res: AxiosResponse): AxiosResponse => {
        const url = res.config.url || '' ;
        // 如果是登录请求，则在登录成功后设置请求头中的Authorization字段
        if (url.indexOf('/users/login') !== -1) {

        }
        return res;
    }

    /**
     * 数据过滤拦截器
     * @param res http请求返回
     */
    dataFilterInterceptor = (res: AxiosResponse): AxiosResponse=> {
        return res.data;
    }

    /**
     * 请求返回status失败统一处理
     */
    errorInterceptor = (res: any): any => {
        if (res.status !== true) {
            message.error(res.message);
        }
        return res;
    }

    /**
     * 请求参数过滤拦截器, 应后台要求，如果参数为空字符串，就别传，传了后台就报错给我看😂
     */
    paramsFilterInterceptor = (req: any): any => {
        const params = req.params || {};
        Object.keys(params).forEach((key) => {
            if (params[key] === '') {
                delete params[key];
            }
        });
        return req;
    }

    /**
     * 请求发送方法
     * @param config 请求配置参数
     */
    request<T = any>(config: any): Promise<T> {
        return BaseHttp.$$http.request(config);
    }
}

export default BaseHttp;