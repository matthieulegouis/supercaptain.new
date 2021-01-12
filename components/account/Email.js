import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from 'antd';

import Section from '../form/Section';
import updateProfile from '../../utils/functions/updateProfile';

export default function Email({ value }) {
  const { t } = useTranslation('global');
  const [email, setEmail] = useState(value);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setEmail(value);
  }, [value]);

  const editContent = (
    <Input
      type="text"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder={t('Email')}
    />
  );

  const update = async () => {
    await updateProfile({ email }).then(() => {
      setSaving(false);
    });
  };

  return (
    <Section
      value={email}
      title="Email"
      titleIfEmpty="add_email"
      editContent={editContent}
      update={update}
      saving={saving}
      setSaving={setSaving}
    />
  );
}
