import { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import updateProfile from '../../utils/functions/agent/updateProfile';

export default function Title({ value, canEdit }) {
  const { t } = useTranslation('global');
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(value);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  // Init
  useEffect(() => {
    setTitle(value);
  }, [value]);

  // Update
  const update = async () => {
    setPending(true);
    await updateProfile({ title })
      .then(() => {
        setPending(false);
        setEdit(false);
      })
      .catch((err) => {
        setPending(false);
        setError(err.code);
      });
  };

  if (edit) {
    return (
      <Form onFinish={update}>
        {error}
        <Form.Item>
          <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={pending}>
            {pending ? '...' : t('save')}
          </Button>
          <Button onClick={() => setEdit(false)}>{t('cancel')}</Button>
        </Form.Item>
      </Form>
    );
  }

  return (
    <div>
      {title}
      {canEdit && <Button onClick={() => setEdit(true)}>{t('edit')}</Button>}
    </div>
  );
}
