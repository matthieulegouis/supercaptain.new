import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from 'antd';
import { useDebounce } from 'use-debounce';
import { useRecoilValue } from 'recoil';

import Section from '../form/Section';
import CheckEmailCode from './CheckEmailCode';
import updateEmail from '../../utils/functions/action/updateEmail';
import checkFormatEmail from '../../utils/functions/check/checkFormatEmail';
import checkAvailabilityEmail from '../../utils/functions/check/checkAvailabilityEmail';
import { emailState } from '../../lib/account';

export default function Email() {
  const { t } = useTranslation('global');
  const value = useRecoilValue(emailState);
  const [email, setEmail] = useState(value);
  const [password, setPassword] = useState('');
  const [emailAvailable, setEmailAvailable] = useState(false);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showCheckEmailCode, setShowCheckEmailCode] = useState(false);
  // Debounce for email
  const debounceDelay = 500;
  const [debouncedEmail] = useDebounce(email, debounceDelay);
  const [waitForDebounce, setWaitForDebounce] = useState(false);
  // Disabled state
  const disabledCheck = debouncedEmail === value || !checkFormatEmail(debouncedEmail);
  const disabled = disabledCheck || waitForDebounce || !emailAvailable;

  // Init
  useEffect(() => {
    setEmail(value);
  }, [value]);

  // Wait for debounce
  useEffect(() => {
    setWaitForDebounce(true);
    setTimeout(() => {
      setWaitForDebounce(false);
    }, debounceDelay);
  }, [email]);

  // Check if email is available
  useEffect(() => {
    if (!disabledCheck) {
      checkAvailabilityEmail(debouncedEmail)
        .then(() => setEmailAvailable(true))
        .catch(() => setEmailAvailable(false));
    }
  }, [debouncedEmail]);

  // Reset
  const reset = () => {
    setEmail(value);
  };

  // Update
  const update = (pass) => {
    setPassword(pass);
    setShowCheckEmailCode(true);
  };

  // Save when the code is verified
  const save = async () => {
    await updateEmail(debouncedEmail, password)
      .then(() => setSuccess(true))
      .catch((err) => setError(err.message));
  };

  // Edit content
  const editContent = (
    <>
      <Input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t('Email')}
      />
      {showCheckEmailCode && (
        <CheckEmailCode
          email={debouncedEmail}
          visibility={showCheckEmailCode}
          setVisibility={setShowCheckEmailCode}
          save={save}
        />
      )}
    </>
  );

  return (
    <Section
      value={email}
      title="Email"
      titleIfEmpty="add_email"
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
      reAuthRequired
    />
  );
}
