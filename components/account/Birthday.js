import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Section from '../form/Section';
import DatePicker from '../form/DatePicker';
import updateProfile from '../../utils/functions/action/updateProfile';
import months from '../../utils/data/months';
import checkBirthday from '../../utils/functions/check/checkBirthday';

export default function Birthday({ value }) {
  const { t } = useTranslation('global');
  const [birthday, setBirthday] = useState(value);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const disabled = !checkBirthday(birthday);

  // Init
  useEffect(() => {
    setBirthday(value);
  }, [value]);

  // Handle error message
  useEffect(() => {
    if (disabled) setError(t('must_be_over_16_years_old'));
    else setError('');
  }, [birthday]);

  // Edit content
  const editContent = (
    <DatePicker date={birthday || new Date()} onChange={(date) => setBirthday(date)} />
  );

  // Reset
  const reset = () => setBirthday(value);

  // Update
  const update = async () => {
    await updateProfile({ birthday })
      .then(() => setSuccess(true))
      .catch((err) => setError(err.code));
  };

  return (
    <Section
      value={birthday && `${birthday.getDate()} ${t(months[birthday.getMonth()])}`}
      title="Birthday"
      titleIfEmpty="add_birthday"
      editContent={editContent}
      update={update}
      pending={pending}
      setPending={setPending}
      success={success}
      setSuccess={setSuccess}
      error={error}
      setError={setError}
      reset={reset}
      disabled={disabled}
    />
  );
}
