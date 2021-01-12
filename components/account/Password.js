import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff } from 'react-feather';
import { Input } from 'antd';

import Section from '../form/Section';
import checkFormatPassword from '../../utils/functions/checkFormatPassword';
import updatePassword from '../../utils/functions/updatePassword';

export default function Password() {
  const { t } = useTranslation('global');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const disabled = !checkFormatPassword(password) || password !== passwordCheck;
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const editContent = (
    <>
      <Input.Password
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder={t('new_password')}
        iconRender={(visible) => (visible ? <Eye /> : <EyeOff />)}
      />
      <Input.Password
        value={passwordCheck}
        onChange={(e) => setPasswordCheck(e.target.value)}
        type="password"
        placeholder={t('confirm_new_password')}
        iconRender={(visible) => (visible ? <Eye /> : <EyeOff />)}
      />
    </>
  );

  const update = async () => {
    setPending(true);
    await updatePassword(password)
      .then(() => {
        setPending(false);
        setSuccess(true);
      })
      .catch((err) => {
        setPending(false);
        setSuccess(false);
        setError(err.code);
      });
  };

  const reset = () => {
    setPassword('');
    setPasswordCheck('');
    setError('');
  };

  return (
    <Section
      value="password_disclaimer"
      title="Password"
      editContent={editContent}
      update={update}
      pending={pending}
      setPending={setPending}
      success={success}
      error={error}
      disabled={disabled}
      reset={reset}
    />
  );
}
