import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'antd';
import demoService, { IbaseResponse } from '../service/DemoService';

const { Column } = Table;

interface Iprops {
    loading: boolean
}

interface ItableItem {
    id: number
    name: string
    age: string
    hobby: string
}

export interface IloadingParams {
    page: number
    size: number
}

export interface IloadingResponse extends IbaseResponse {
    data: ItableItem[]
}

const TestCache: React.FC<Iprops> = (props: Iprops) => {

    const [ list, setList ] = useState<ItableItem[]>([]);
    const { loading } = props;

    useEffect(() => {
        getList();
    }, []);

    // 获取table列表
    const getList = async () => {
        const params = {
            page: 1,
            size: 10
        }
        const result = await demoService.testLoading(params);
        setList(result);
    }

    return (
        <div>
            <p>借助redux实现请求加载状态控制</p>
            <Button onClick = { getList }>获取列表</Button>
            <Table
                dataSource = { list }
                pagination = { false }
                loading = { loading }
                rowKey = "id">
                <Column title = "姓名" dataIndex = "name" key = "name"></Column>
                <Column title = "年龄" dataIndex = "age" key = "age"></Column>
                <Column title = "爱好" dataIndex = "hobby" key = "hobby"></Column>
            </Table>
        </div>
    )
}

export default connect((state: any) => {
    return {
        loading: state.common.loading
    }
})(TestCache);