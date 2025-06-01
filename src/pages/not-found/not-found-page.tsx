import { FC, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './not-found-page.module.scss';

const NotFound404Page: FC = function NotFound404Page() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.classList.add(styles.animate);
    }
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.topPanel}>Mix-Servers Skin Downloader</div>

      <div className={styles.content}>
        <div className={styles.leftPanel}>
          <div className={styles.errorCode}>404</div>
          <h2 className={styles.subtitle}>Страница не работает</h2>
          <p className={styles.description}>Вероятнее всего её не существует</p>
          <Link to="/" className={styles.backLink}>
            Окак, на главную
          </Link>
        </div>

        <img
          src="/src/images/not-found.png"
          alt="not-found"
          className={styles.image}
        />
      </div>
    </div>
  );
};
export default NotFound404Page;
