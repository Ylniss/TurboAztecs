import { Sprite, Texture } from 'pixi.js';
import { PixiComponent, applyDefaultProps } from '@inlet/react-pixi';

export default PixiComponent('DraggableSprite', {
  create: props => {
    return Sprite.from(props.textureNames[0]);
  },
  willUnmount: (instance, parent) => {
    instance.destroy();
  },
  applyProps: (instance, oldProps, newProps) => {
    const {
      onStart,
      onDrag,
      onStop,
      onDoubleClick,
      textureNames,
      backTextureName,
      id,
      gameObjects,
    } = newProps;
    applyDefaultProps(instance, oldProps, newProps);

    if (!instance.setup) {
      instance.setup = true;

      instance.cursor = 'grab';

      const textures = textureNames.map(name => Texture.from(name));

      let backTexture;
      if (backTextureName) {
        backTexture = Texture.from(backTextureName);
      }

      const update = () => {
        requestAnimationFrame(update);
        instance.position.set(gameObjects[id].x, gameObjects[id].y);
        instance.zIndex = gameObjects[id].z;

        if (backTexture && gameObjects[id].flipped) {
          instance.texture = backTexture;
        } else {
          instance.texture = textures[gameObjects[id].turn];
        }
      };
      update();

      //dragging
      instance.interactive = true;
      const cursorOffset = { x: 0, y: 0 };
      let dragging = false;

      let clicks = 0;
      let doubleClickTime = 0;

      const handleDoubleClick = () => {
        ++clicks;
        doubleClickTime = setTimeout(() => {
          clicks = 0;
        }, 300);
        if (clicks === 2) {
          onDoubleClick();
          clicks = 0;
          clearTimeout(doubleClickTime);
        }
      };

      const onPointerDown = e => {
        if (e.data.button !== 0) return;
        cursorOffset.x = e.data.getLocalPosition(instance).x;
        cursorOffset.y = e.data.getLocalPosition(instance).y;
        dragging = true;
        onStart && onStart();

        handleDoubleClick();
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
        gameObjects[id].turn = (gameObjects[id].turn + 1) % textureNames.length;
      };

      instance.on('pointerdown', e => onPointerDown(e));
      instance.on('pointermove', e => onPointerMove(e));
      instance.on('pointerup', e => onPointerUp(e));
      instance.on('pointerupoutside', e => onPointerUp(e));

      instance.on('rightclick', e => onRightClick(e));
    }
  },
});
