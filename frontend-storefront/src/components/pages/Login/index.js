import React, { useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

const Login = () => {
  //   const account = useSelector((state) => state?.account?.account);

  //   useEffect(() => {
  //     if (account?.access_token) {
  //       window.location.href = ROUTE_DASHBOARD;
  //     }
  //   }, []);

  const onFinish = (values) => {
    //   axios
    //     .post(API_LOGIN, values)
    //     .then((res) => {
    //       if (res?.status != 200) {
    //         alert(res?.data?.message);
    //         return;
    //       }
    //       handleLoginSuccess(res?.data);
    //     })
    //     .catch((err) => console.log(err));
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col">
      <h1 className="mb-5 text-3xl font-bold">LOGIN</h1>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button primary className="mr-3" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
