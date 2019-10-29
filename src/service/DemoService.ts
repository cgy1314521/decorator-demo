import BaseService from './BaseService';
import { cache, loading, operateSuccess, debounce } from './decorator';
import { IcacheResponse, IcacheParams } from '..//page/Cache';
import { IloadingParams, IloadingResponse } from '../page/Loading';
import { COMMON_ACTION } from '../store/common';
import { IdebounceParams, IdebounceResponse } from '../page/Debounce';

export interface IbaseResponse {
    status: boolean
    statusCode: number
    message: string
}

class DemoService extends BaseService {

    // 测试缓存接口, 该接口在每次刷新后第一次被调用时发出请求，之后直接从缓存中获取数据
    @cache('testCache')
    async testCache(params?: IcacheParams) {
        try {
            const result = await this.GET<IcacheParams, IcacheResponse>('/demo/testCache', { params });

            // 即使请求失败了，也能够返回符合格式的数据，保证代码正常运行
            if (result.status === false) {
                return {
                    data: {
                        name: '',
                        age: '',
                        hobby: ''
                    },
                    status: false,
                    statusCode: -1,
                    message: '请求失败'
                }
            }
            return result;
        } catch(err) {

            // 即使请求失败了，也要返回符合格式的数据，保证代码正常运行
            return {
                data: {
                    name: '',
                    age: '',
                    hobby: ''
                },
                status: false,
                statusCode: -1,
                message: '请求失败'
            }
        }
    }

    // 统一请求loading状态控制，react中借助redux存储请求状态，Vue可借助vuex。
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

    // 统一操作成功提示，常见于中后台应用
    @operateSuccess
    async testOperate(data: any) {
        try {
            const result = await this.POST('/demo/testOperate', { data });
            return result;
        } catch(err) {
            return {}
        }
    }

    // 在固定时间内限定http请求仅执行一次，常见于搜索
    @debounce(1000, true)
    @loading(COMMON_ACTION.LOADING_STATE, 'loading')
    async testDebounce(params: IdebounceParams) {
        try {
            const result = await this.GET<IdebounceParams, IdebounceResponse>('/demo/testDebounce', { params });
            if (result.status === false) {
                return []
            } else {
                return result.data;
            }
        } catch(err) {
            return []
        }
    }
}

export default new DemoService();
