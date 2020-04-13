import React, { useEffect, useRef, useState, useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import { useCollider } from '../../../hooks/collider';
import DraggableSprite from './DraggableSprite';

export const GameObject = ({ id, gameObjects, images }) => {
  const { zPositions } = useContext(GlobalContext);
  const [gameObject] = useState(gameObjects[id]);
  const { handleCollision } = useCollider();

  useEffect(() => {
    gameObjects[id].z = zPositions[gameObject.type];
    console.log(`${gameObject.name} (${gameObject.id}) rendered!`);
  }, []);

  const onDragStart = () => {
    let zPosition = zPositions[gameObject.type];
    zPositions[gameObject.type] = ++zPosition;
    gameObjects[id].z = ++zPosition;

    console.log(
      gameObject.name + ' X: ' + gameObject.x + ' Y: ' + gameObject.y + ' Z: ' + gameObject.z
    );
  };

  const onDrag = position => {
    gameObject.childrenIds.forEach(childId => {
      const offset = {
        x: gameObjects[childId].x - gameObject.x,
        y: gameObjects[childId].y - gameObject.y,
      };
      gameObjects[childId].x = position.x + offset.x;
      gameObjects[childId].y = position.y + offset.y;
    });

    gameObjects[id].x = position.x;
    gameObjects[id].y = position.y;

    console.log(
      gameObject.name + ' X: ' + gameObject.x + ' Y: ' + gameObject.y + ' Z: ' + gameObject.z
    );
  };

  const onDragEnd = () => {
    //handleCollision(gameObjects, gameObject, onCollision);
  };

  //const onCollision = collidedGameObj => {};

  return (
    <DraggableSprite
      onStart={onDragStart}
      onDrag={onDrag}
      onStop={onDragEnd}
      id={id}
      gameObjects={gameObjects}
      image={images[gameObject.name + '.png']}
      x={gameObject.x}
      y={gameObject.y}
      zIndex={gameObject.z ? gameObject.z : 0}
      scale={0.93}
    />
  );
};
