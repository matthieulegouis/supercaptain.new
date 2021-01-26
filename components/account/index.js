import { useEffect, useState } from 'react';

import fetchAccount from '../../utils/functions/fetch/fetchAccount';
import Gender from './Gender';
import FullName from './FullName';
import Birthday from './Birthday';
import Language from './Language';
import Username from './Username';
import Email from './Email';
import Password from './Password';

export default function Account() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccount().then((result) => {
      setData(result);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <>
      <FullName value={data.fullName} />
      <Gender value={data.gender} />
      <Birthday value={data.birthday} />
      <Language value={data.language} />
      <Username />
      <Email />
      <Password />
    </>
  );
}
