import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

import Section from '../form/Section';
import updateProfile from '../../utils/functions/updateProfile';

export default function Language({ value }) {
  const { t } = useTranslation('global');
  const { Option } = Select;
  const [language, setLanguage] = useState(value);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLanguage(value);
  }, [value]);

  const editContent = (
    <Select value={language} onChange={(v) => setLanguage(v)}>
      <Option value="en">{t('en')}</Option>
      <Option value="fr">{t('fr')}</Option>
    </Select>
  );

  const update = async () => {
    await updateProfile({ language }).then(() => {
      setSaving(false);
    });
  };

  return (
    <Section
      value={language}
      title="Language"
      titleIfEmpty="add_language"
      editContent={editContent}
      update={update}
      saving={saving}
      setSaving={setSaving}
    />
  );
}
