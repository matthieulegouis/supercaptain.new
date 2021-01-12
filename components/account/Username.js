import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from 'antd';

import Section from '../form/Section';
import updateProfile from '../../utils/functions/updateProfile';

export default function Username({ value }) {
  const { t } = useTranslation('global');
  const [username, setUsername] = useState(value);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setUsername(value);
  }, [value]);

  const editContent = (
    <Input
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      placeholder={t('FullName')}
    />
  );

  const update = async () => {
    await updateProfile({ username }).then(() => {
      setSaving(false);
    });
  };

  return (
    <Section
      value={username}
      title="Username"
      titleIfEmpty="add_username"
      editContent={editContent}
      update={update}
      saving={saving}
      setSaving={setSaving}
    />
  );
}
