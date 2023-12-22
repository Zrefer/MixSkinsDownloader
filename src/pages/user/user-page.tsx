import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { SkinData, SkinView } from '../../components';
import GraysonSkin from '../../images/Grayson.png';
import GraysonCloak from '../../images/Grayson_cloak.png';

import styles from './user-page.module.css';

function getViewHeight(): number {
  const height = window.innerHeight;
  return Math.min(height / 2, 400 + height * 0.05);
}

const UserPage: FC = function UserPage() {
  const { username } = useParams();

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
            skin: GraysonSkin,
            cape: GraysonCloak,
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
      <SkinData
        skin={{
          width: 64,
          height: 32,
          size: 14276,
          url: GraysonSkin,
          name: `${username}_skin`,
        }}
        cape={null}
      />
    </div>
  );
};
export default UserPage;
