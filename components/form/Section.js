import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';

export default function Section({
  value,
  title,
  titleIfEmpty,
  editContent,
  update,
  saving,
  setSaving,
}) {
  const { t } = useTranslation('global');
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (!saving) setEdit(false);
  }, [saving]);

  const save = () => {
    update();
    setSaving(true);
  };

  // Value
  if (!edit && value) {
    return (
      <div>
        <div className="font-medium">{t(title)}</div>
        {value}
        <Button onClick={() => setEdit(true)}>Edit</Button>
      </div>
    );
  }

  // Edit
  if (edit) {
    return (
      <div>
        <div className="font-medium">{t(title)}</div>
        {editContent}
        {saving ? <Button>...</Button> : <Button onClick={save}>Save</Button>}
        <Button onClick={() => setEdit(false)}>Cancel</Button>
      </div>
    );
  }

  return (
    <div>
      <Button onClick={() => setEdit(true)}>{titleIfEmpty}</Button>
    </div>
  );
}
