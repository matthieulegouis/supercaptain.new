import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff } from 'react-feather';

import signIn from '../../utils/functions/agent/signIn';
import Main from '../layout/Main';

export default function SignIn() {
  const { t } = useTranslation('global');
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
          <Input.Password
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('password')}
            iconRender={(visible) => (visible ? <Eye /> : <EyeOff />)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {t('ok')}
          </Button>
        </Form.Item>
      </Form>
    </Main>
  );
}
