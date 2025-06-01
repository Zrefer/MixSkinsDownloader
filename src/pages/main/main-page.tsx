import { FC } from 'react';
import { Outlet } from 'react-router';
import { Footer, SearchField } from '../../components';
import styles from './main-page.module.scss';

const MainPage: FC = function MainPage() {
  return (
    <>
      <main className={styles.main}>
        <section className={styles.container}>
          <h1 className={styles.title}>Mix-Servers Skin Downloader</h1>
          <SearchField />
          <Outlet />
        </section>
      </main>
      <Footer />
    </>
  );
};
export default MainPage;
