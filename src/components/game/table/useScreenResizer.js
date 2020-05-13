import { useContext } from 'react';
import { useApp, useTick } from '@inlet/react-pixi';
import { GlobalContext } from '../../../context/GlobalState';
import { useAspectRatioContainer } from '../../../hooks/useAspectRatioContainer';

export const useScreenResizer = () => {
  const app = useApp();
  const { screenDefaults } = useContext(GlobalContext);
  const { width, height } = useAspectRatioContainer(screenDefaults.aspectRatio);

  useTick(() => {
      app.stage.position.set(app.renderer.width / 2, app.renderer.height / 2);
      app.stage.scale.set(width / screenDefaults.width, height / screenDefaults.height);
      app.stage.pivot.set(screenDefaults.width / 2, screenDefaults.height / 2);
  });
};
