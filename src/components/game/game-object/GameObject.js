import React, { useEffect, useState, useContext, useRef } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import { Draggable } from '../draggable/Draggable';
import { useCollider } from '../../../hooks/collider';

export const GameObject = ({ id, gameObjects, images }) => {
  const { zPositions, setZPositions, setGameObjects } = useContext(GlobalContext);
  const [gameObject] = useState(gameObjects[id]);
  const { handleCollision } = useCollider();

  useEffect(() => {
    console.log(`${gameObject.name} (${gameObject.id}) re-rendered!`);
  });

  useEffect(() => {
    const updatedGameObjects = gameObjects;
    updatedGameObjects[id].z = zPositions[gameObject.type];
    setGameObjects(updatedGameObjects);
    console.log(`${gameObject.name} (${gameObject.id}) rendered!`);
  }, []);

  const onDragStart = () => {
    let zPosition = zPositions[gameObject.type];
    zPositions[gameObject.type] = ++zPosition;
    setZPositions(zPositions);

    const updatedGameObjects = gameObjects;
    updatedGameObjects[id].z = zPosition;
    setGameObjects(updatedGameObjects);

    console.log(
      gameObject.name + ' X: ' + gameObject.x + ' Y: ' + gameObject.y + ' Z: ' + gameObject.z
    );
  };

  const onDrag = position => {

    const updatedGameObjects = gameObjects;

    gameObject.childrenIds.forEach(childId => {
      const offset = {
        x: updatedGameObjects[childId].x - gameObject.x,
        y: updatedGameObjects[childId].y - gameObject.y,
      };
      updatedGameObjects[childId].x = position.x + offset.x;
      updatedGameObjects[childId].y = position.y + offset.y;
    });

    updatedGameObjects[id].x = position.x;
    updatedGameObjects[id].y = position.y;
    updatedGameObjects[id].collisionBox.x = position.x;
    updatedGameObjects[id].collisionBox.y = position.y;

    setGameObjects(updatedGameObjects);

    let zPosition = zPositions[gameObject.type];
    zPositions[gameObject.type] = zPosition;
    setZPositions(zPositions);

    console.log(
      gameObject.name + ' X: ' + gameObject.x + ' Y: ' + gameObject.y + ' Z: ' + gameObject.z
    );
  };

  const onDragEnd = () => {
    //handleCollision(gameObjects, gameObject, onCollision);
  };

  //const onCollision = collidedGameObj => {};

  const getShadowEffectStyle = type => {
    switch (type) {
      case 'diamond':
      case 'pawn':
        return '';
      default:
        return 'shadow-around';
    }
  };

  return (
    <Draggable
      startPosition={{ x: gameObject.x, y: gameObject.y }}
      onStart={onDragStart}
      onDrag={onDrag}
      onStop={onDragEnd}
    >
      <img
        className={getShadowEffectStyle(gameObject.type)}
        style={{
          position: 'absolute',
          zIndex: gameObject.z,
          height: `${gameObject.size}%`,
          transform: `rotate(${gameObject.turn * 90}deg)`,
        }}
        draggable='false'
        src={images[gameObject.name + gameObject.imgExtension]}
        alt={gameObject.name}
      />
    </Draggable>
  );
};
