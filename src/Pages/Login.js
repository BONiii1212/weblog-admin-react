import React , {useState} from 'react';
import 'antd/dist/antd.css';
import {useNavigate} from "react-router-dom";
import { Card,Spin,message,Form,Input, Button } from 'antd';
import '../static/css/Login.css';
import { useAuth } from '../context/auth-context';

function Login(){
    const [isLoading, setIsLoading] = useState(false)
    const {login} = useAuth()

    const checkLogin = (data)=>{
        setIsLoading(true)
        login(data).then(res=>setIsLoading(false))
    }

    return(
        <div className="login-div">
            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="BONiii Blog  System" bordered={true} style={{ width: 400 }} >
                    <Form onFinish={checkLogin}>
                        <Form.Item name={"username"} rules={[{required:true ,message:"请输入用户名"}]}>
                            <Input placeholder={"用户名"} type="text" id={"username"}></Input>
                        </Form.Item>
                        <Form.Item name={"password"} rules={[{required:true,message:"请输入密码"}]}>
                            <Input placeholder={"密码"} type="password" id={"password"}></Input>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType={"submit"} type={"primary"}>登录</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Spin>
        </div>
    )
}
export default Login