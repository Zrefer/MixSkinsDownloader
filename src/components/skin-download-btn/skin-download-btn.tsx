import { FC } from 'react';
import useWidth from '../../hooks/useWidth';
import { ISkinData } from '../../types/skin';
import styles from './skin-download-btn.module.scss';

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
  const width = useWidth();

  const getButtonText = () => {
    if (!data) {
      return `${type === 'skin' ? 'Скин' : 'Плащ'} отсутствует`;
    }

    let text = `Скачать ${type === 'skin' ? 'Скин' : 'Плащ'}`;
    text += `, ${data.width}x${data.height}`;
    if (width >= 768) text += `, ${getSizeText(data.size)}`;
    return text;
  };

  return (
    <a href={data?.imageData} download={data?.name}>
      <button type="button" className={styles.button} disabled={data === null}>
        {getButtonText()}
        {width >= 768 && <div className={styles.image} />}
      </button>
    </a>
  );
};
export default SkinDownloadBtn;
