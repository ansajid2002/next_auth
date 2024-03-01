"use client"
import React from 'react';
import { Form, Input, Button } from 'antd';
import { signIn } from 'next-auth/react';
const page = () => {

    const onFinish = async (values) => {
        console.log('Received values:', values);
      
        try {
          const response = await signIn('credentials', {
            email: values.username,
            password: values.password,
            redirect: false,
            callbackUrl: '/',
          });
      
          console.log('signIn response:', response);
          // You can add your logic based on the signIn response here
        } catch (error) {
          console.error('Error signing in:', error);
          // Handle any errors that occur during sign-in
        }
      };
      return (
        <div style={{ width: 300, margin: 'auto', marginTop: 100 }}>
          <h1>Login</h1>
          <Form
            name="loginForm"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder="Username" />
            </Form.Item>
    
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
    
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      );
}

export default page