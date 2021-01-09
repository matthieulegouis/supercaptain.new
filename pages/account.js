import { Button } from 'antd';

import Main from '../components/layout/Main';
import signOut from '../utils/signOut';

export default function Page() {
  return (
    <Main title="account">
      <div>
        <Button onClick={signOut}>Logout</Button>
      </div>
    </Main>
  );
}
