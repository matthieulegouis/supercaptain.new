import { RecoilRoot } from 'recoil';

import Tracker from '../components/layout/Tracker';
import '../i18n';
import '../styles/styles.scss';

export default function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Tracker>
        <Component {...pageProps} />
      </Tracker>
    </RecoilRoot>
  );
}
