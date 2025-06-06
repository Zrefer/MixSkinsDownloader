import { FC } from 'react';
import { ISkinData } from '../../types/skin';
import SkinDownloadBtn from '../skin-download-btn/skin-download-btn';
import styles from './skin-data.module.scss';

const SkinData: FC<{
  skin: ISkinData;
  cape: ISkinData;
}> = function SkinData({ skin, cape }) {
  return (
    <div className={styles.container}>
      <SkinDownloadBtn type="skin" data={skin} />
      <SkinDownloadBtn type="cape" data={cape} />
    </div>
  );
};
export default SkinData;
