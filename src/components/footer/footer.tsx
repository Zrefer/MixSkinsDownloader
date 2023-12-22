import { FC } from 'react';

import styles from './footer.module.css';

const Footer: FC = function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Copyright (c) 2023 Zrefer</p>
      <p>Version: 1.0.0</p>
    </footer>
  );
};
export default Footer;
