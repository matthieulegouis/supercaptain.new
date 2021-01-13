import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { auth } from '../../firestore';
import SignIn from '../account/SignIn';
import { loggedState, usernameState, emailState } from '../../lib/account';

export default function Tracker({ children }) {
  const [logged, setLogged] = useRecoilState(loggedState);
  const setUsername = useSetRecoilState(usernameState);
  const setEmail = useSetRecoilState(emailState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((account) => {
      if (account) {
        setLogged(true);
        setUsername(account.displayName);
        setEmail(account.email);
        setLoading(false);
      } else {
        setLogged(false);
        setUsername('');
        setLoading(false);
      }
    });
  }, []);

  if (logged && !loading) return children;

  if (!logged && !loading) return <SignIn />;

  return null;
}
