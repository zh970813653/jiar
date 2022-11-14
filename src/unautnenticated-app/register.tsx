import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";
import { Form, Input, Button } from "antd";
import { useAsync } from "utils/use-async";
const apiUrl = process.env.REACT_APP_API_URL;

export const RegisterScreen = ({onError}: {onError: (error:Error) => void}) => {
  const { register, user } = useAuth();
  const {run,isLoading} = useAsync(undefined,{throwOnError:true})
  
  const handleSubmit = async ({cpassword,...values}: {username:string,password:string,cpassword:string}) => {
    try {
      if(cpassword !== values.password){
       return onError(new Error('两次密码不同'))
      }
      await run(register(values))
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
  const confirmRules = [
    {
      require: true,
      message: "请确认密码",
    }
  ]
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name={"username"} rules={usernameRules}>
        <Input type="text" placeholder="用户名" id={"username"} />
      </Form.Item>
      <Form.Item name={"password"} rules={passwordRules}>
        <Input placeholder="密码" type="password" id={"password"} />
      </Form.Item>
      <Form.Item name={"cpassword"} rules={confirmRules}>
        <Input placeholder="确认密码" type="password" id={"cpassword"} />
      </Form.Item>
      <Form.Item>
        <Button loading={isLoading} htmlType="submit" type={"primary"}>
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};
