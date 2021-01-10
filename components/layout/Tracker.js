import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { auth } from '../../firestore';
import SignIn from '../account/SignIn';
import { loggedState, userNameState } from '../../lib/account';

export default function Tracker({ children }) {
  const [logged, setLogged] = useRecoilState(loggedState);
  const setUserName = useSetRecoilState(userNameState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((account) => {
      if (account) {
        setLogged(true);
        setUserName(account.displayName);
        setLoading(false);
      } else {
        setLogged(false);
        setUserName('');
        setLoading(false);
      }
    });
  }, []);

  if (logged && !loading) return children;

  if (!logged && !loading) return <SignIn />;

  return null;
}
