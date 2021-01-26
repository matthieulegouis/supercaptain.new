import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { uidState } from '../../lib/account';
import Title from './Title';
import Avatar from '../common/avatar';

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
      {data.username}
      {data.fullName}
      <Title value={data.title} canEdit={canEdit} />
      <Avatar value={data.avatar} canEdit={canEdit} />
    </>
  );
}
