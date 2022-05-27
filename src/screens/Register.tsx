import React from 'react';
import {observer} from "mobx-react-lite";
import {Button, Form, Input, message} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {RoutePath} from "../app-routes";
import {useRoot} from "../core";

type FormValues = {
    login: string;
    password: string;
}

export default observer(function Login() {
    const {auth, errorParser} = useRoot();
    const onFinish = async (values: FormValues) => {
        const response = await auth.signUpByCredentials(values)
        if (!response.success) {
            message.error(errorParser.describe(response.left).summary);
        }
    }
    return (
        <div id="login-screen">
            <Form
                className="login-form"
                onFinish={onFinish}
            >
                <Form.Item
                    name="login"
                    rules={[{required: true, message: 'Please input your login!'}]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Login"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{required: true, message: 'Please input your Password!'}]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Sign up
                    </Button>
                    Or <Link to={RoutePath.Login}>sign in!</Link>
                </Form.Item>
            </Form>
        </div>
    )
})
