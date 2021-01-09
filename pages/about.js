import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import Main from '../components/layout/Main';

export default function Page() {
  const { t } = useTranslation('global');

  return (
    <Main>
      <h1>{t('title')}</h1>
      <Link href="/">
        <a>Index</a>
      </Link>
    </Main>
  );
}
