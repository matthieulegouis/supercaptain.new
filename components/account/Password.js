import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff } from 'react-feather';
import { Input } from 'antd';

import Section from '../form/Section';
import checkFormatPassword from '../../utils/functions/check/checkFormatPassword';
import updatePassword from '../../utils/functions/action/updatePassword';

export default function Password() {
  const { t } = useTranslation('global');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const disabled = !checkFormatPassword(password) || password !== passwordCheck;

  // Edit content
  const editContent = (
    <>
      <Input.Password
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={t('new_password')}
        iconRender={(visible) => (visible ? <Eye /> : <EyeOff />)}
      />
      <Input.Password
        value={passwordCheck}
        onChange={(e) => setPasswordCheck(e.target.value)}
        placeholder={t('confirm_new_password')}
        iconRender={(visible) => (visible ? <Eye /> : <EyeOff />)}
      />
    </>
  );

  // Reset
  const reset = () => {
    setPassword('');
    setPasswordCheck('');
  };

  // Update
  const update = async () => {
    setPending(true);
    await updatePassword(password)
      .then(() => setSuccess(true))
      .catch((err) => setError(err.code));
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
      setSuccess={setSuccess}
      error={error}
      setError={setError}
      reset={reset}
      disabled={disabled}
    />
  );
}
