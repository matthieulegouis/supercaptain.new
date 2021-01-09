import Head from 'next/head';

import Header from './Header';

export default function Main({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? `${title} | Supercaptain` : 'Supercaptain'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="container">
          <Header />
          {children}
        </div>
      </main>
    </>
  );
}
