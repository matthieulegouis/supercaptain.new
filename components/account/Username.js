import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from 'antd';
import { useDebounce } from 'use-debounce';
import { useRecoilValue } from 'recoil';

import Section from '../form/Section';
import updateUsername from '../../utils/functions/action/updateUsername';
import checkFormatUsername from '../../utils/functions/check/checkFormatUsername';
import checkAvailabilityUsername from '../../utils/functions/check/checkAvailabilityUsername';
import { usernameState } from '../../lib/account';

export default function Username() {
  const { t } = useTranslation('global');
  const value = useRecoilValue(usernameState);
  const [username, setUsername] = useState(value);
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  // Debounce for username
  const debounceDelay = 500;
  const [debouncedUsername] = useDebounce(username.trim().toLowerCase(), debounceDelay);
  const [waitForDebounce, setWaitForDebounce] = useState(false);
  // Disabled state
  const disabledCheck = !checkFormatUsername(debouncedUsername) || debouncedUsername === value;
  const disabled = disabledCheck || waitForDebounce || !usernameAvailable;

  // Init
  useEffect(() => {
    setUsername(value);
  }, [value]);

  // Edit content
  const editContent = (
    <Input
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      placeholder={t('Username')}
    />
  );

  // Wait for debounce
  useEffect(() => {
    setWaitForDebounce(true);
    setTimeout(() => {
      setWaitForDebounce(false);
    }, debounceDelay);
  }, [username]);

  // Check if username is available
  useEffect(() => {
    if (!disabledCheck) {
      checkAvailabilityUsername(debouncedUsername)
        .then(() => setUsernameAvailable(true))
        .catch(() => setUsernameAvailable(false));
    }
  }, [debouncedUsername]);

  // Reset
  const reset = () => {
    setUsername(value);
  };

  // Update
  const update = async () => {
    await updateUsername(debouncedUsername)
      .then(() => setSuccess(true))
      .catch((err) => setError(err.message));
  };

  return (
    <Section
      value={username}
      title="Username"
      titleIfEmpty="add_username"
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
