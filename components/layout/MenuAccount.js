import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { Menu, Button } from 'antd';

import { uidState } from '../../lib/account';
import signOut from '../../utils/functions/agent/signOut';

export default function MenuAccount() {
  const { t } = useTranslation('global');
  const uid = useRecoilValue(uidState);

  return (
    <Menu>
      <Menu.Item>
        <Link href="/account">
          <a>{t('my_account')}</a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link href={`/agents/${uid}`}>
          <a>{t('my_profile')}</a>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <Button type="link" onClick={signOut}>
          {t('logout')}
        </Button>
      </Menu.Item>
    </Menu>
  );
}
