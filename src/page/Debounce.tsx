import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Input, Table } from 'antd';
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

export interface IdebounceParams {
    keyword: string
    page: number
    size: number
}

export interface IdebounceResponse extends IbaseResponse {
    data: ItableItem[]
}

const Debounce: React.FC<Iprops> = (props: Iprops) => {

    const [ list, setList ] = useState<ItableItem[]>([]);
    const { loading } = props;

    useEffect(() => {
        const params = {
            keyword: '',
            page: 1,
            size: 10
        }
        getList(params);
    }, []);

    // 获取table列表
    const getList = async (params: IdebounceParams) => {
        const result = await demoService.testDebounce(params);
        setList(result);
    }

    const keywordChange = (e: any) => {
        const value = e.target.value;
        const params = {
            keyword: value,
            page: 1,
            size: 10
        }
        getList(params);
    }

    return (
        <div>
            <p>限定http请求在一定时间内仅触发最后一次，常用于搜索</p>
            <p>
                <Input 
                    placeholder = "请输入搜索关键字"
                    onChange = { (e) => { e.persist(); keywordChange(e)}} />
            </p>
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
})(Debounce);