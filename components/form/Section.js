import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Button } from 'antd';

import ReAuth from '../account/ReAuth';

export default function Section({
  value,
  title,
  titleIfEmpty,
  editContent,
  update,
  pending,
  setPending,
  success,
  setSuccess,
  error,
  setError,
  disabled,
  reset,
  reAuthRequired,
}) {
  const { t } = useTranslation('global');
  const [edit, setEdit] = useState(false);
  const [showReAuth, setShowReAuth] = useState(false);
  const [password, setPassword] = useState(false);

  // Handle success state
  useEffect(() => {
    setPending(false);
    if (success) {
      setError('');
      setEdit(false);
      setSuccess(false);
    }
  }, [success]);

  // Handle error state
  useEffect(() => {
    if (error) {
      setPending(false);
      setSuccess(false);
    }
  }, [error]);

  // Edit
  const handleEdit = () => {
    if (reAuthRequired) setShowReAuth(true);
    else setEdit(true);
  };

  // Save
  const save = () => {
    update(password);
    setError('');
    setPending(true);
  };

  // Cancel
  const cancel = () => {
    setEdit(false);
    reset();
  };

  // If value
  if (!edit && value) {
    return (
      <div>
        <div className="font-medium">{t(title)}</div>
        <div className="flex justify-between">
          <div>{value}</div>
          <Button onClick={handleEdit}>Edit</Button>
        </div>
        {reAuthRequired && (
          <ReAuth
            visibility={showReAuth}
            setVisibility={setShowReAuth}
            setEdit={setEdit}
            passPassword={setPassword}
          />
        )}
      </div>
    );
  }

  // Edit mode
  if (edit) {
    return (
      <div>
        <div className="font-medium">{t(title)}</div>
        <Form onFinish={save}>
          {error}
          <div>{editContent}</div>
          <div className="flex justify-end">
            <div className="flex space-x-1">
              <Button onClick={cancel}>Cancel</Button>
              <Button type="primary" htmlType="submit" disabled={disabled || pending}>
                {pending ? '...' : t('Save')}
              </Button>
            </div>
          </div>
        </Form>
      </div>
    );
  }

  // If no value
  return (
    <div>
      <Button onClick={() => setEdit(true)}>{titleIfEmpty}</Button>
    </div>
  );
}
