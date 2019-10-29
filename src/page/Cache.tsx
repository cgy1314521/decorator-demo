import React, { useState } from 'react';
import { Button } from 'antd';
import demoService, { IbaseResponse } from '../service/DemoService';

interface Idata {
    name: string
    age: string
    hobby: string
}

export interface IcacheParams {
    cache: string
}

export interface IcacheResponse extends IbaseResponse {
    data: Idata
}

const TestCache: React.FC = () => {

    const [ data, setData ] = useState<Idata>({ name: '', age: '', hobby: '' });

    const demoHttp = async () => {
        const params = {
            cache: '我有一只小毛驴，我从来也不骑'
        }
        const result = await demoService.testCache(params);
        setData(result.data);
    }

    return (
        <div>
            <p>测试缓存</p>
            <p>姓名: { data.name }</p>
            <p>年龄: { data.age }</p>
            <p>爱好: { data.hobby }</p>
            <Button onClick = { demoHttp }>请求数据</Button>
        </div>
    )
}

export default TestCache;