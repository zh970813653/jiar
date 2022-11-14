import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";
import { Form, Input, Button } from "antd";
import { useAsync } from "utils/use-async";
const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = ({onError}: {onError: (error:Error) => void}) => {
  const { login, user } = useAuth();
  const {run,isLoading} = useAsync(undefined,{throwOnError:true})
  const handleSubmit = async (values: {username:string,password:string}) => {
    try {
      await run(login(values))
    } catch (error) {
      onError(error as Error)
    }
    
  };
  const usernameRules = [
    {
      require: true,
      message: "请输入用户名",
    },
  ];
  const passwordRules = [
    {
      require: true,
      message: "请输入用户名",
    },
  ];
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name={"username"} rules={usernameRules}>
        <Input type="text" placeholder="用户名" id={"username"} />
      </Form.Item>
      <Form.Item name={"password"} rules={passwordRules}>
        <Input placeholder="密码" type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <Button loading={isLoading} htmlType="submit" type={"primary"}>登录</Button>
      </Form.Item>
    </Form>
  );
};
