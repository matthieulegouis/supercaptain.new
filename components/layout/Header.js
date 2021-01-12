import Link from 'next/link';
import { Avatar as AvatarIcon, Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';
import { User } from 'react-feather';

import MenuAccount from './MenuAccount';

export default function Header() {
  const { t } = useTranslation('global');

  return (
    <nav className="pt-3 pb-3">
      <div className="flex items-center justify-between">
        <ul>
          <li className="inline-block mr-5">
            <Link activeClassName="active" href="/">
              <a>{t('home')}</a>
            </Link>
          </li>
          <li className="inline-block mr-5">
            <Link activeClassName="active" href="/agents">
              <a>{t('Agents')}</a>
            </Link>
          </li>
          <li className="inline-block mr-5">
            <Link activeClassName="active" href="/admin">
              <a>{t('admin')}</a>
            </Link>
          </li>
        </ul>
        <Dropdown overlay={<MenuAccount />} trigger={['click']} placement="bottomRight">
          <AvatarIcon size={36} icon={<User size={20} />} />
        </Dropdown>
      </div>
    </nav>
  );
}
