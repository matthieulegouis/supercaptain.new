import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';

export default function Section({
  value,
  title,
  titleIfEmpty,
  editContent,
  update,
  pending,
  setPending,
  success,
  error,
  disabled,
  reset,
}) {
  const { t } = useTranslation('global');
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (success) setEdit(false);
  }, [success]);

  const save = () => {
    update();
    setPending(true);
  };

  const cancel = () => {
    setEdit(false);
    reset();
  };

  // Value
  if (!edit && value) {
    return (
      <div>
        <div className="font-medium">{t(title)}</div>
        <div className="flex justify-between">
          <div>{value}</div>
          <Button onClick={() => setEdit(true)}>Edit</Button>
        </div>
      </div>
    );
  }

  // Edit
  if (edit) {
    return (
      <div>
        <div className="font-medium">{t(title)}</div>
        {error}
        <div>{editContent}</div>
        <div className="flex justify-end">
          <div className="flex space-x-1">
            <Button onClick={cancel}>Cancel</Button>
            {pending ? (
              <Button type="primary">...</Button>
            ) : (
                <Button type="primary" onClick={save} disabled={disabled}>
                  {t('Save')}
                </Button>
              )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Button onClick={() => setEdit(true)}>{titleIfEmpty}</Button>
    </div>
  );
}
