import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Menu, Button } from 'antd';

import signOut from '../../utils/functions/signOut';

export default function MenuAccount() {
  const { t } = useTranslation('global');

  return (
    <Menu>
      <Menu.Item>
        <Link href="/account">
          <a>{t('my_account')}</a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link href="/profile">
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
