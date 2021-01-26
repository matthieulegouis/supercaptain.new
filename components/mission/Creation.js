import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import createMission from '../../utils/functions/mission/createMission';

export default function Creation() {
  const { t } = useTranslation('global');
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState('');

  // Create
  const create = () => {
    createMission(title);
  };

  return (
    <Form onFinish={create}>
      <Form.Item>
        <Input
          type="text"
          placeholder={t('Name')}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
