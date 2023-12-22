import { FC } from 'react';

import { ISkinData } from '../../types/skin';

import styles from './skin-download-btn.module.css';

interface ISkinDownloadProps {
  type: 'cape' | 'skin';
  data: ISkinData;
}

function getSizeText(size: number) {
  if (size > 1024) return `${(size / 1024).toFixed(1)}kb`;
  return `${size}b`;
}

const SkinDownloadBtn: FC<ISkinDownloadProps> = function SkinDownloadBtn({
  type,
  data,
}) {
  return (
    <a href={data?.imageData} download={data?.name}>
      <button type="button" className={styles.button} disabled={data === null}>
        {data
          ? `Скачать ${type === 'skin' ? 'Скин' : 'Плащ'}`
          : `${type === 'skin' ? 'Скин' : 'Плащ'} отсутствует`}
        {data && `, ${data.width}x${data.height}, ${getSizeText(data.size)}`}
        <div className={styles.image} />
      </button>
    </a>
  );
};
export default SkinDownloadBtn;
