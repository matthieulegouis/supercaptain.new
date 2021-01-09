import { useState } from 'react';
import { Form, Input, Button } from 'antd';

import signIn from '../../utils/signIn';
import Main from '../layout/Main';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onFinish = () => {
    signIn(email, password).catch((err) => setError(err.code));
  };

  return (
    <Main title="login">
      {error}
      <Form onFinish={onFinish}>
        <Form.Item>
          <Input onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Input onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            OK
          </Button>
        </Form.Item>
      </Form>
    </Main>
  );
}
