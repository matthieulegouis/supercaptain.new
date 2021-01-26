import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

import Section from '../form/Section';
import updateProfile from '../../utils/functions/action/updateProfile';

export default function Language({ value }) {
  const { t } = useTranslation('global');
  const { Option } = Select;
  const [language, setLanguage] = useState(value);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Init
  useEffect(() => {
    setLanguage(value);
  }, [value]);

  // Edit content
  const editContent = (
    <Select value={language} onChange={(v) => setLanguage(v)}>
      <Option value="en">{t('en')}</Option>
      <Option value="fr">{t('fr')}</Option>
    </Select>
  );

  // Reset
  const reset = () => {
    setLanguage(value);
  };

  // Update
  const update = async () => {
    await updateProfile({ language })
      .then(() => setSuccess(true))
      .catch((err) => setError(err.code));
  };

  return (
    <Section
      value={language}
      title="Language"
      titleIfEmpty="add_language"
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
