import { useEffect, useState } from 'react';
import { Button } from 'antd';

import signOut from '../utils/functions/signOut';
import fetchProfile from '../utils/functions/fetchProfile';
import Main from '../components/layout/Main';
import Gender from '../components/account/Gender';
import FullName from '../components/account/FullName';
import Birthday from '../components/account/Birthday';

export default function Page() {
  const [gender, setGender] = useState();
  const [fullName, setFullName] = useState();
  const [birthday, setBirthday] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile()
      .then((data) => {
        setGender(data.gender);
        setFullName(data.fullName);
        setBirthday(new Date(data.birthday.seconds * 1000));
      })
      .then(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <Main title="account">
      <FullName value={fullName} />
      <Gender value={gender} />
      <Birthday value={birthday} />
      <div>
        <Button onClick={signOut}>Logout</Button>
      </div>
    </Main>
  );
}
