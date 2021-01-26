import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { auth } from '../../firestore';
import SignIn from '../account/SignIn';
import { loggedState, uidState, usernameState, emailState } from '../../lib/account';

// Urls accessible offline
const URLS_ACCESSIBLE_OFFLINE = ['/agents/[id]', '/companies/[id]', '/missions/[id]'];

export default function Tracker({ children }) {
  const router = useRouter();
  const [logged, setLogged] = useRecoilState(loggedState);
  const setUid = useSetRecoilState(uidState);
  const setUsername = useSetRecoilState(usernameState);
  const setEmail = useSetRecoilState(emailState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((account) => {
      if (account) {
        setLogged(true);
        setUid(account.uid);
        setUsername(account.displayName);
        setEmail(account.email);
        setLoading(false);
      } else {
        setLogged(false);
        setUid('');
        setUsername('');
        setEmail('');
        setLoading(false);
      }
    });
  }, []);

  if (!loading && (logged || URLS_ACCESSIBLE_OFFLINE.includes(router.pathname))) return children;

  if (!logged && !loading) return <SignIn />;

  return null;
}
