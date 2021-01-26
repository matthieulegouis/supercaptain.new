import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { uidState } from '../../lib/account';
import Admin from './Admin';

export default function Full({ data }) {
  const uid = useRecoilValue(uidState);
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    if (data.id === uid) {
      setCanEdit(true);
    }
  }, []);

  return (
    <>
      <b>{data.name}</b>
      <Admin />
    </>
  );
}
