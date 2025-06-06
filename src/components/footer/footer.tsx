import { FC } from 'react';
import styles from './footer.module.scss';

const Footer: FC = function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Copyright © 2025 Zrefer</p>
      <p>I love Grayson {'<3'}</p>
      <p>Version: 1.1.0</p>
    </footer>
  );
};
export default Footer;
