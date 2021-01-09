import { useRecoilValue } from 'recoil';

import Main from '../components/layout/Main';
import { loggedState } from '../lib/account';

export default function Page() {
  const logged = useRecoilValue(loggedState);

  return (
    <Main>
      <div className="mt-10 text-center">
        <h1>You are logged? {logged ? 'yes' : 'no'}</h1>
      </div>
    </Main>
  );
}
