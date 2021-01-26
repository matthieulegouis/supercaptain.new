import Link from 'next/link';
import { Avatar as AvatarIcon, Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';
import { User, Plus } from 'react-feather';
import { useRecoilValue } from 'recoil';

import { loggedState } from '../../lib/account';

import MenuAccount from './MenuAccount';
import MenuCreation from './MenuCreation';

export default function Header() {
  const { t } = useTranslation('global');
  const logged = useRecoilValue(loggedState);

  // Header if logged
  if (logged) {
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
              <Link activeClassName="active" href="/companies">
                <a>{t('companies')}</a>
              </Link>
            </li>
            <li className="inline-block mr-5">
              <Link activeClassName="active" href="/missions">
                <a>{t('missions')}</a>
              </Link>
            </li>
          </ul>
          <div className="flex items-center justify-between space-x-5">
            <Dropdown overlay={<MenuCreation />} trigger={['click']} placement="bottomRight">
              <Plus />
            </Dropdown>
            <Dropdown overlay={<MenuAccount />} trigger={['click']} placement="bottomRight">
              <AvatarIcon size={36} icon={<User size={20} />} />
            </Dropdown>
          </div>
        </div>
      </nav>
    );
  }

  // Header if not logged
  return <nav>Header not logged</nav>;
}
