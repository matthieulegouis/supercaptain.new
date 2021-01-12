import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from 'antd';

import Section from '../form/Section';
import updateProfile from '../../utils/functions/updateProfile';

export default function FullName({ value }) {
  const { t } = useTranslation('global');
  const [fullName, setFullName] = useState(value);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setFullName(value);
  }, [value]);

  const editContent = (
    <Input
      type="text"
      value={fullName}
      onChange={(e) => setFullName(e.target.value)}
      placeholder={t('FullName')}
    />
  );

  const update = async () => {
    await updateProfile({ fullName }).then(() => {
      setSaving(false);
    });
  };

  return (
    <Section
      value={fullName}
      title="FullName"
      titleIfEmpty="add_fullName"
      editContent={editContent}
      update={update}
      saving={saving}
      setSaving={setSaving}
    />
  );
}
