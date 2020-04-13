import { Sprite } from 'pixi.js';
import { PixiComponent, applyDefaultProps } from '@inlet/react-pixi';

export default PixiComponent('DraggableSprite', {
  create: props => {
    console.log('CREATING SPRITE');
    return Sprite.from(props.image);
  },
  didMount: (instance, parent) => {
    console.log('Draggable didMount called!');
  },
  willUnmount: (instance, parent) => {
    console.log('Draggable willUnmound called!');
    instance.destroy();
  },
  applyProps: (instance, oldProps, newProps) => {
    const { onStart, onDrag, onStop, id, gameObjects } = newProps;
    console.log('APPLY PROPS!');
    applyDefaultProps(instance, oldProps, newProps);

    if (!instance.setupListeners) {
      instance.setupListeners = true;

      const gameLoop = () => {
        requestAnimationFrame(gameLoop);
        instance.position.x = gameObjects[id].x;
        instance.position.y = gameObjects[id].y;
        instance.zIndex = gameObjects[id].z;
      };
      gameLoop();

      instance.interactive = true;

      const cursorOffset = { x: 0, y: 0 };
      let dragging = false;

      const onPointerDown = e => {
        if (e.data.button !== 0) return;
        cursorOffset.x = e.data.getLocalPosition(instance).x;
        cursorOffset.y = e.data.getLocalPosition(instance).y;
        dragging = true;
        console.log('pointerDOWN in DraggableSprite called!');
        onStart && onStart();
      };

      const onPointerMove = e => {
        if (dragging) {
          console.log('pointerMOVE in DraggableSprite called!');
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
          console.log('pointerUP in DraggableSprite called!');
          onStop && onStop(instance.position.x, instance.position.y);
          dragging = false;
        }
      };

      instance.on('pointerdown', e => onPointerDown(e));
      instance.on('pointermove', e => onPointerMove(e));
      instance.on('pointerup', e => onPointerUp(e));
      instance.on('pointerupoutside', e => onPointerUp(e));
    }
  },
});
