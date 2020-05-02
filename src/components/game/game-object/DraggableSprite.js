import { Sprite, Texture } from 'pixi.js';
import { PixiComponent, applyDefaultProps } from '@inlet/react-pixi';

export default PixiComponent('DraggableSprite', {
  create: props => {
    return Sprite.from(props.textures[0]);
  },
  willUnmount: (instance, parent) => {
    instance.destroy();
  },
  applyProps: (instance, oldProps, newProps) => {
    const { onStart, onDrag, onStop, id, gameObjects } = newProps;
    applyDefaultProps(instance, oldProps, newProps);

    if (!instance.setup) {
      instance.setup = true;

      instance.cursor = 'grab';

      const update = () => {
        requestAnimationFrame(update);
        instance.position.set(gameObjects[id].x, gameObjects[id].y);
        instance.zIndex = gameObjects[id].z;
        instance.texture.rotate = 2 * gameObjects[id].turn; //todo: unfortunately has to be changed - cause: many same textures on screen
      };
      update();

      //dragging
      instance.interactive = true;
      const cursorOffset = { x: 0, y: 0 };
      let dragging = false;

      const onPointerDown = e => {
        if (e.data.button !== 0) return;
        cursorOffset.x = e.data.getLocalPosition(instance).x;
        cursorOffset.y = e.data.getLocalPosition(instance).y;
        dragging = true;
        onStart && onStart();
      };

      const onPointerMove = e => {
        if (dragging) {
          const newX = e.data.getLocalPosition(instance.parent).x - cursorOffset.x;
          const newY = e.data.getLocalPosition(instance.parent).y - cursorOffset.y;
          if (newX !== instance.position.x || newY !== instance.position.y) {
            instance.position.x = newX;
            instance.position.y = newY;
            onDrag && onDrag({ x: newX, y: newY });
          }
        }
      };

      const onPointerUp = e => {
        if (dragging) {
          onStop && onStop(instance.position.x, instance.position.y);
          dragging = false;
        }
      };

      const onRightClick = e => {
        gameObjects[id].turn = (gameObjects[id].turn + 1) % 4;
      };

      instance.on('pointerdown', e => onPointerDown(e));
      instance.on('pointermove', e => onPointerMove(e));
      instance.on('pointerup', e => onPointerUp(e));
      instance.on('pointerupoutside', e => onPointerUp(e));

      instance.on('rightclick', e => onRightClick(e));
    }
  },
});
