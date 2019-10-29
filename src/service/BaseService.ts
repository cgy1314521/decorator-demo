import BaseHttp from './BaseHttp';
import { AxiosError } from 'axios';
import { message } from 'antd';

export interface IbaseResponse {
    message: string
    status: boolean
    statusCode: string
}

interface Iparams<IrequestParam> {
    data?:IrequestParam, 
    params?: IrequestParam
}

const envUrl = {
    dev: '/',
    prod: '',
}

const hostname = window.location.hostname;
let baseUrl = '';
if (hostname.indexOf('localhost') !== -1) {
    baseUrl = envUrl.dev;
} else {
    baseUrl = envUrl.prod;
}

BaseHttp.baseUrl = baseUrl;

class BaseService extends BaseHttp {
    constructor() {
        super();
    }

    /**
     * GET方法
     * @param url 请求路径
     * @param params 请求参数
     * @param config 请求配置
     */
    async GET<IrequestParam = any, Iresponsne = any>(url: string, params?: Iparams<IrequestParam>, config?: any): Promise<Iresponsne> {
        const requestConfig = {
            url: url,
            method: 'GET',
            data: params && params.data,
            params: params && params.params,
            config: config
        }
        try {
            const result = await this.request(requestConfig);
            return result;
        } catch(err) {
            this.netWorkFaild(err);
            throw err;
        }
    }

    /**
     * POST方法
     * @param url 请求路径
     * @param params 请求参数
     * @param config 请求配置
     */
    async POST<IrequestParam = any, Iresponsne = any>(url: string, params: Iparams<IrequestParam>, config?: any): Promise<Iresponsne> {
        const requestConfig = {
            url: url,
            method: 'POST',
            data: params.data,
            params: params.params,
            config: config
        }
        try {
            const result = await this.request(requestConfig);
            return result;
        } catch(err) {
            this.netWorkFaild(err);
            throw err;
        }
    }

    /**
     * PUT方法
     * @param url 请求路径
     * @param params 请求参数
     * @param config 请求配置
     */
    async PUT<IrequestParam = any, Iresponsne = any>(url: string, params: Iparams<IrequestParam>, config?: any): Promise<Iresponsne> {
        const requestConfig = {
            url: url,
            method: 'PUT',
            data: params.data,
            params: params.params,
            config: config
        }
        try {
            const result = await this.request(requestConfig);
            return result;
        } catch(err) {
            this.netWorkFaild(err);
            throw err;
        }
    }

    /**
     * DELETE方法
     * @param url 请求路径
     * @param params 请求参数
     * @param config 请求配置
     */
    async DELETE<IrequestParam = any, Iresponsne = any>(url: string, params: Iparams<IrequestParam>, config?: any): Promise<Iresponsne> {
        const requestConfig = {
            url: url,
            method: 'DELETE',
            data: params.data,
            params: params.params,
            config: config
        }
        try {
            const result = await this.request(requestConfig);
            return result;
        } catch(err) {
            this.netWorkFaild(err);
            throw err;
        }
    }

    /**
     * http请求失败统一处理
     * @param err Axios请求错误信息
     */
    netWorkFaild(err: AxiosError) {
        const response = err.response || { status: -1, data: {} };
        const data = response.data;
        message.error(data.message);
    }
}

export default BaseService;