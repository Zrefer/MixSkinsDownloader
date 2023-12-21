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
  view: ViewProps;
  animation: AnimationProps;
  controls: ControlsProps;
};

const viewProps: ViewProps = {
  width: 300,
  height: 300,
  SSRFactor: 1,
  fov: 70,
  zoom: 0.9,
  light: 2,
  background: 'transparent',
  rotate: 0,
};

const animProps: AnimationProps = {
  type: 'walk',
  animSpeed: 0.2,
  rotate: false,
  rotateSpeed: 0.3,
};

const ctrlProps: ControlsProps = {
  rotate: true,
  zoom: false,
  pan: false,
  damping: true,
};

const SkinView: FC<SkinViewerProps> = function SkinView({
  skin,
  view = {},
  animation = {},
  controls = {},
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [skinImage, setSkinImage] = useState<HTMLImageElement | ImageBitmap>();
  const [capeImage, setCapeImage] = useState<HTMLImageElement | ImageBitmap>();

  const SSRFactor = view.SSRFactor || viewProps.SSRFactor!;
  const width = view.width || viewProps.width!;
  const height = view.height || viewProps.height!;

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
      panorama: view.panorama,
    });

    // ViewProps
    viewer.width = width * SSRFactor;
    viewer.height = height * SSRFactor;

    viewer.fov = view.fov || viewProps.fov!;
    viewer.zoom = view.zoom || viewProps.zoom!;
    viewer.globalLight.intensity = view.light || viewProps.light!;

    const rotationXDeg = (view.rotate || viewProps.rotate!) * (Math.PI / 180);
    viewer.playerWrapper.rotation.y = rotationXDeg;
    viewer.playerWrapper.position.y = -2;

    const background = view.background || viewProps.background!;
    if (background === 'transparent')
      viewer.renderer.setClearColor(0xffffff, 0);
    else viewer.background = background;

    // AnimationProps - animation
    switch (animation.type || animProps.type!) {
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
    if (viewer.animation) {
      viewer.animation.speed = animation.animSpeed || animProps.animSpeed!;
    }

    // AnimationProps - rotate
    viewer.autoRotate = animation.rotate || animProps.rotate!;
    viewer.autoRotateSpeed = animation.rotateSpeed || animProps.rotateSpeed!;

    // ControlsProps
    viewer.controls.enabled = true;
    viewer.controls.enableRotate = controls.rotate || ctrlProps.rotate!;
    viewer.controls.enableZoom = controls.zoom || ctrlProps.zoom!;
    viewer.controls.enablePan = controls.pan || ctrlProps.pan!;
    viewer.controls.enableDamping = controls.damping || ctrlProps.damping!;

    // Multiply controls speed to SSRFactor
    viewer.controls.rotateSpeed *= SSRFactor;
    viewer.controls.panSpeed *= SSRFactor;
    viewer.controls.keyPanSpeed *= SSRFactor;

    return () => {
      viewer.dispose();
    };
  }, [
    skinImage,
    capeImage,
    width,
    height,
    SSRFactor,
    animation.animSpeed,
    animation.rotate,
    animation.rotateSpeed,
    animation.type,
    controls.damping,
    controls.pan,
    controls.rotate,
    controls.zoom,
    skin.nameTag,
    skin.nameTagColor,
    view.SSRFactor,
    view.background,
    view.fov,
    view.light,
    view.panorama,
    view.rotate,
    view.zoom,
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

export default SkinView;
