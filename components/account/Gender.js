import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

import Section from '../form/Section';
import updateProfile from '../../utils/functions/account/updateProfile';

export default function Gender({ value }) {
  const { t } = useTranslation('global');
  const { Option } = Select;
  const [gender, setGender] = useState(value);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Init
  useEffect(() => {
    setGender(value);
  }, [value]);

  // Edit content
  const editContent = (
    <Select value={gender} onChange={(v) => setGender(v)}>
      <Option value="male">{t('male')}</Option>
      <Option value="female">{t('female')}</Option>
      <Option value="confidential">{t('confidential')}</Option>
    </Select>
  );

  // Reset
  const reset = () => {
    setGender(value);
  };

  // Update
  const update = async () => {
    await updateProfile({ gender })
      .then(() => setSuccess(true))
      .catch((err) => setError(err.code));
  };

  return (
    <Section
      value={gender}
      title="Gender"
      titleIfEmpty="add_gender"
      editContent={editContent}
      update={update}
      pending={pending}
      setPending={setPending}
      success={success}
      setSuccess={setSuccess}
      error={error}
      setError={setError}
      reset={reset}
    />
  );
}
