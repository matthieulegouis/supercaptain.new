import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Section from '../form/Section';
import DatePicker from '../form/DatePicker';
import updateProfile from '../../utils/functions/updateProfile';
import months from '../../utils/data/months';

export default function Birthday({ value }) {
  const { t } = useTranslation('global');
  const [birthday, setBirthday] = useState(value);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setBirthday(value);
  }, [value]);

  const editContent = (
    <DatePicker date={birthday || new Date()} onChange={(date) => setBirthday(date)} />
  );

  const update = async () => {
    await updateProfile({ birthday }).then(() => {
      setSuccess(true);
    });
  };

  return (
    <Section
      value={birthday && `${birthday.getDate()} ${t(months[birthday.getMonth()])}`}
      title="Birthday"
      titleIfEmpty="add_birthday"
      editContent={editContent}
      update={update}
      success={success}
    />
  );
}
