import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Menu } from 'antd';

export default function MenuAccount() {
  const { t } = useTranslation('global');

  return (
    <Menu>
      <Menu.Item>
        <Link href="/companies/creation">
          <a>{t('create_company')}</a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link href="/missions/creation">
          <a>{t('create_mission')}</a>
        </Link>
      </Menu.Item>
    </Menu>
  );
}
