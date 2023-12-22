import { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  FlyingAnimation,
  IdleAnimation,
  NameTagObject,
  RunningAnimation,
  SkinViewer,
  WalkingAnimation,
} from 'skinview3d';

import loadImage from '../../utils/utils';

type SkinAnimationType = 'none' | 'idle' | 'walk' | 'run' | 'fly';

type SkinProps = {
  skin: string | HTMLImageElement | ImageBitmap;
  cape?: string | HTMLImageElement | ImageBitmap;
  nameTag?: string;
  nameTagColor?: string;
};

type ViewProps = {
  width?: number;
  height?: number;
  SSRFactor?: number;
  fov?: number;
  zoom?: number;
  light?: number;
  background?: string;
  panorama?: string;
  rotate?: number;
};

type AnimationProps = {
  type?: SkinAnimationType;
  animSpeed?: number;
  rotate?: boolean;
  rotateSpeed?: number;
};

type ControlsProps = {
  rotate?: boolean;
  zoom?: boolean;
  pan?: boolean;
  damping?: boolean;
};

type SkinViewerProps = {
  skin: SkinProps;
  view?: ViewProps;
  animation?: AnimationProps;
  controls?: ControlsProps;
};

const defView: ViewProps = {
  width: 300,
  height: 300,
  SSRFactor: 4,
  fov: 70,
  zoom: 0.8,
  light: 3,
  background: 'transparent',
  rotate: 0,
};

const defAnim: AnimationProps = {
  type: 'walk',
  animSpeed: 0.2,
  rotate: false,
  rotateSpeed: 0.3,
};

const defCtrls: ControlsProps = {
  rotate: true,
  zoom: false,
  pan: false,
  damping: true,
};

const SkinView: FC<SkinViewerProps> = function SkinView({
  skin,
  view,
  animation,
  controls,
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [skinImage, setSkinImage] = useState<HTMLImageElement | ImageBitmap>();
  const [capeImage, setCapeImage] = useState<HTMLImageElement | ImageBitmap>();

  const viewParams = { ...defView, ...view };
  const animParams = { ...defAnim, ...animation };
  const ctrlsParams = { ...defCtrls, ...controls };

  const SSRFactor = viewParams.SSRFactor!;
  const width = viewParams.width!;
  const height = viewParams.height!;
  const background = viewParams.background!;

  // Load skin image in useEffect
  useEffect(() => {
    if (typeof skin.skin === 'string') {
      loadImage(skin.skin, { useCors: true })
        .then((image) => setSkinImage(image))
        .catch();
    } else setSkinImage(skin.skin);

    return () => {
      setSkinImage(undefined);
    };
  }, [skin.skin]);

  // Load cape image in useEffect
  useEffect(() => {
    if (skin.cape) {
      if (typeof skin.cape === 'string') {
        loadImage(skin.cape, { useCors: true })
          .then((image) => setCapeImage(image))
          .catch();
      } else setCapeImage(skin.cape);
    }

    return () => {
      setCapeImage(undefined);
    };
  }, [skin.cape]);

  // Init SkinViewer in useLayoutEffect
  useLayoutEffect(() => {
    if (!canvasRef.current || !skinImage) return () => {};

    // Constructor with SkinProps and no-param values
    const viewer = new SkinViewer({
      canvas: canvasRef.current,
      skin: skinImage,
      cape: capeImage,
      nameTag: new NameTagObject(skin.nameTag, {
        textStyle: skin.nameTagColor,
      }),
      panorama: viewParams.panorama,
    });

    // ViewProps
    viewer.width = width * SSRFactor;
    viewer.height = height * SSRFactor;

    viewer.fov = viewParams.fov!;
    viewer.zoom = viewParams.zoom!;
    viewer.globalLight.intensity = viewParams.light!;

    const rotationXDeg = viewParams.rotate! * (Math.PI / 180);
    viewer.playerWrapper.rotation.y = rotationXDeg;
    viewer.playerWrapper.position.y = -2;

    if (background === 'transparent')
      viewer.renderer.setClearColor(0xffffff, 0);
    else viewer.background = background;

    // AnimationProps - animation
    switch (animParams.type) {
      case 'walk':
        viewer.animation = new WalkingAnimation();
        break;
      case 'run':
        viewer.animation = new RunningAnimation();
        break;
      case 'fly':
        viewer.animation = new FlyingAnimation();
        break;
      default:
        viewer.animation = new IdleAnimation();
        break;
    }
    if (viewer.animation) viewer.animation.speed = animParams.animSpeed!;

    // AnimationProps - rotate
    viewer.autoRotate = animParams.rotate!;
    viewer.autoRotateSpeed = animParams.rotateSpeed!;

    // ControlsProps
    viewer.controls.enabled = true;
    viewer.controls.enableRotate = ctrlsParams.rotate!;
    viewer.controls.enableZoom = ctrlsParams.zoom!;
    viewer.controls.enablePan = ctrlsParams.pan!;
    viewer.controls.enableDamping = ctrlsParams.damping!;

    // Multiply controls speed to SSRFactor
    viewer.controls.rotateSpeed *= SSRFactor;
    viewer.controls.panSpeed *= SSRFactor;
    viewer.controls.keyPanSpeed *= SSRFactor;

    return () => viewer.dispose();
  }, [
    skinImage,
    capeImage,
    width,
    height,
    SSRFactor,
    background,
    animParams.animSpeed,
    animParams.rotate,
    animParams.rotateSpeed,
    animParams.type,
    ctrlsParams.damping,
    ctrlsParams.pan,
    ctrlsParams.rotate,
    ctrlsParams.zoom,
    skin.nameTag,
    skin.nameTagColor,
    viewParams.fov,
    viewParams.light,
    viewParams.panorama,
    viewParams.rotate,
    viewParams.zoom,
  ]);

  return (
    <div style={{ width, height, overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        style={{
          transform: `scale(${1 / SSRFactor})`,
          transformOrigin: 'top left',
        }}
      />
    </div>
  );
};
SkinView.defaultProps = {
  view: defView,
  animation: defAnim,
  controls: defCtrls,
};

export default SkinView;
