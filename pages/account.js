import { useEffect, useState } from 'react';

import fetchProfile from '../utils/functions/account/fetchProfile';
import Main from '../components/layout/Main';
import Gender from '../components/account/Gender';
import FullName from '../components/account/FullName';
import Birthday from '../components/account/Birthday';
import Language from '../components/account/Language';
import Username from '../components/account/Username';
import Email from '../components/account/Email';
import Password from '../components/account/Password';

export default function Page() {
  const [gender, setGender] = useState();
  const [fullName, setFullName] = useState();
  const [birthday, setBirthday] = useState();
  const [language, setLanguage] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile()
      .then((data) => {
        setGender(data.gender);
        setFullName(data.fullName);
        setBirthday(new Date(data.birthday.seconds * 1000));
        setLanguage(data.language);
      })
      .then(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Main title="Account">
        <div>Loading</div>
      </Main>
    );
  }

  return (
    <Main title="Account">
      <FullName value={fullName} />
      <Gender value={gender} />
      <Birthday value={birthday} />
      <Language value={language} />
      <Username />
      <Email />
      <Password />
    </Main>
  );
}
