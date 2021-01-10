import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

import Section from '../form/Section';
import updateProfile from '../../utils/functions/updateProfile';

export default function Gender({ value }) {
  const { t } = useTranslation('global');
  const { Option } = Select;
  const [gender, setGender] = useState(value);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setGender(value);
  }, [value]);

  const editContent = (
    <Select value={gender} onChange={(v) => setGender(v)}>
      <Option value="male">{t('male')}</Option>
      <Option value="female">{t('female')}</Option>
      <Option value="confidential">{t('confidential')}</Option>
    </Select>
  );

  const update = async () => {
    await updateProfile({ gender }).then(() => {
      setSaving(false);
    });
  };

  return (
    <Section
      value={value}
      title="Gender"
      titleIfEmpty="add_gender"
      editContent={editContent}
      update={update}
      saving={saving}
      setSaving={setSaving}
    />
  );
}
