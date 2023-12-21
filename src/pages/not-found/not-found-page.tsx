import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './not-found-page.module.css';

const NotFound404Page: FC = function NotFound404Page() {
  return (
    <div className={styles.container}>
      <div className={styles.image} />
      <p className={styles.title}>404</p>
      <p className={styles.text}>Упс. Страница не найдена.</p>
      <Link to="/" replace>
        <button type="button" className={styles.button}>
          На главную
        </button>
      </Link>
    </div>
  );
};
export default NotFound404Page;
