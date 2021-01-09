import Link from 'next/link';
import { useRecoilValue } from 'recoil';

import { loggedState, userNameState } from '../../lib/account';

export default function Header() {
  const logged = useRecoilValue(loggedState);
  const userName = useRecoilValue(userNameState);

  return (
    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/account">
          <a>Account</a>
        </Link>
        {logged ? 'logged' : 'not logged'}
        {userName}
      </nav>
    </header>
  );
}
