import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import createCompany from '../../utils/functions/company/createCompany';

export default function Creation() {
  const { t } = useTranslation('global');
  const [name, setName] = useState('');
  const [categories, setCategories] = useState('');

  // Create
  const create = () => {
    createCompany(name);
  };

  return (
    <Form onFinish={create}>
      <Form.Item>
        <Input
          type="text"
          placeholder={t('Name')}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {t('create')}
        </Button>
      </Form.Item>
    </Form>
  );
}
