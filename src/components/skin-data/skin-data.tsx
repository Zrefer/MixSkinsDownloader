import { FC } from 'react';

import SkinDownloadBtn from '../skin-download-btn/skin-download-btn';
import { IUserData } from '../../types/skin';

import styles from './skin-data.module.css';

const SkinData: FC<IUserData> = function SkinData({ skin, cape }) {
  return (
    <div className={styles.container}>
      <SkinDownloadBtn type="skin" data={skin} />
      <SkinDownloadBtn type="cape" data={cape} />
    </div>
  );
};
export default SkinData;
