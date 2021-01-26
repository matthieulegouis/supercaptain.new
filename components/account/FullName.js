import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from 'antd';

import Section from '../form/Section';
import updateProfile from '../../utils/functions/action/updateProfile';
import checkFormatFullName from '../../utils/functions/check/checkFormatFullName';

export default function FullName({ value }) {
  const { t } = useTranslation('global');
  const [fullName, setFullName] = useState(value);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const disabled = fullName === value || !checkFormatFullName(fullName);

  // Init
  useEffect(() => {
    setFullName(value);
  }, [value]);

  // Edit content
  const editContent = (
    <Input
      type="text"
      value={fullName}
      onChange={(e) => setFullName(e.target.value)}
      placeholder={t('FullName')}
    />
  );

  // Reset
  const reset = () => {
    setFullName(value);
  };

  // Update
  const update = async () => {
    await updateProfile({ fullName })
      .then(() => setSuccess(true))
      .catch((err) => setError(err.code));
  };

  return (
    <Section
      value={fullName}
      title="FullName"
      titleIfEmpty="add_fullName"
      editContent={editContent}
      update={update}
      pending={pending}
      setPending={setPending}
      success={success}
      setSuccess={setSuccess}
      error={error}
      setError={setError}
      disabled={disabled}
      reset={reset}
    />
  );
}
