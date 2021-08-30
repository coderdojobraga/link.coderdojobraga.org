import Head from 'next/head';
import Footer from '~/components/Footer';

import styles from './style.module.css';

const Layout = ({ children, title }) => (
  <div style={{ position: 'relative' }}>
    <div className={styles.rectangle} />
    <div className={styles.curve} />
    <div className={styles.base} />
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <main className={styles.main}>{children}</main>

      <Footer isThemeDark />
    </div>
  </div>
);

export default Layout;
