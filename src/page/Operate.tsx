import React, { useState } from 'react';
import { Input, Button } from 'antd';
import demoService from '../service/DemoService';

const Operate: React.FC = () => {

    const [ name, setName ] = useState('');

    const modify = async () => {
        console.log(name);
        const params = {
            name
        }
        demoService.testOperate(params);
    }

    const nameChange = (e: any) => {
        const value = e.target.value;
        setName(value);
    }

    return (
        <div>
            <p>统一操作成功提示</p>
            <p>
                <Input 
                    placeholder = "请输入姓名"
                    onChange = { (e) => { e.persist(); nameChange(e)}} />
            </p>
            <Button onClick = { modify }>修改</Button>
        </div>
    )
}

export default Operate;