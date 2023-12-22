import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { SkinData, SkinView } from '../../components';
import { ISkinData } from '../../types/skin';
import { getCape, getSkin } from '../../utils/api';
import SteveSkin from '../../images/steve-skin.png';

import styles from './user-page.module.css';

function getViewHeight(): number {
  const height = window.innerHeight;
  return Math.min(height / 2, 400 + height * 0.05);
}

const UserPage: FC = function UserPage() {
  const { username } = useParams();

  const [skinData, setSkinData] = useState<ISkinData>(null);
  const [capeData, setCapeData] = useState<ISkinData>(null);
  useEffect(() => {
    getSkin(username!).then(setSkinData);
    getCape(username!).then(setCapeData);
  }, [username]);

  const [height, setHeight] = useState(getViewHeight());
  useEffect(() => {
    const updateHeight = () => setHeight(getViewHeight());

    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <SkinView
          skin={{
            skin: skinData?.imageData || SteveSkin,
            cape: capeData?.imageData,
            nameTag: username,
          }}
          view={{
            height,
            rotate: 30,
          }}
          controls={{
            zoom: true,
          }}
        />
      </div>
      <SkinData skin={skinData} cape={capeData} />
    </div>
  );
};
export default UserPage;
