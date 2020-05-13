import { Graphics } from 'pixi.js';
import { PixiComponent, applyDefaultProps } from '@inlet/react-pixi';

// for showing collider on screen (developer mode)
export default PixiComponent('Collider', {
  create: props => {
    return new Graphics();
  },
  willUnmount: (instance, parent) => {
    instance.destroy();
  },
  applyProps: (instance, oldProps, newProps) => {
    const { id, gameObjects } = newProps;
    applyDefaultProps(instance, oldProps, newProps);

    if (!instance.setup) {
      instance.setup = true;

      instance.zIndex = 9999999999;
      instance.clear();

      const update = () => {
        requestAnimationFrame(update);
        const collisionCircle = gameObjects[id].collisionCircle;

        instance.clear();
        instance.beginFill(0xff0000, 0.2);
        instance.drawCircle(collisionCircle.x, collisionCircle.y, collisionCircle.radius);
        instance.endFill();
      };
      update();
    }
  },
});
