import { useState } from 'react';
import { X } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { Modal, Form, Input, Button } from 'antd';

import reAuth from '../../utils/functions/agent/reAuth';

const ReAuth = ({ visibility, setVisibility, setEdit, passPassword }) => {
  const { t } = useTranslation('global');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle submit
  const handleSubmit = () => {
    reAuth(password)
      .then(() => setVisibility(false))
      .then(() => passPassword(password))
      .then(() => setEdit(true))
      .catch((err) => setError(err.code));
  };

  // Cancel
  const cancel = () => {
    setVisibility(false);
    setEdit(false);
  };

  return (
    <Modal
      title={t('password')}
      footer={null}
      visible={visibility}
      onCancel={cancel}
      centered
      closeIcon={<X />}
    >
      <Form onFinish={handleSubmit}>
        {error}
        <Form.Item>
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('password')}
            ref={(input) => input && input.focus()}
          />
        </Form.Item>
        <Form.Item>
          <Button
            disabled={password.length < 1}
            type="primary"
            htmlType="submit"
            className="w-full"
          >
            {t('ok')}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ReAuth;
