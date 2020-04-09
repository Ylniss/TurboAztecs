import React, { useEffect, useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import { Draggable } from '../draggable/Draggable';
import { useCollider } from '../../../hooks/collider';

export const GameObject = ({ gameObject, images }) => {
  const { zPositions, setZPositions, updateGameObjects } = useContext(GlobalContext);
  const { handleCollision } = useCollider();

  const getGlobalZPostition = () => {
    return zPositions.filter(x => x.type === gameObject.type)[0].z;
  };

  // update gameObject only with this function
  const update = setProps => {
    setProps();
    updateGameObjects(gameObject);
    console.log(`${gameObject.name} (${gameObject.id}) updated!`);
  };

  useEffect(() => {
    update(() => (gameObject.z = getGlobalZPostition()));
    console.log(`${gameObject.name} (${gameObject.id}) rendered!`);
  }, []);

  // useEffect(() => {
  //   //const gameObj = gameObjects.find(item => item.id === gameObject.id);
  //   setGameObject(gameObjectInit);
  //   console.log(`${gameObjectInit.name} (${gameObjectInit.id}) updated with x: ${gameObjectInit.x} y: ${gameObjectInit.y}`);
  // }, [gameObjects]);

  const onDragStart = () => {
    let zPosition = getGlobalZPostition();
    update(() => (gameObject.z = ++zPosition));
    setZPositions(
      zPositions.map(item =>
        item.type === gameObject.type ? { type: item.type, z: zPosition } : item
      )
    );
    console.log(
      gameObject.name + ' X: ' + gameObject.x + ' Y: ' + gameObject.y + ' Z: ' + gameObject.z
    );
  };

  const setPosition = (gameObj, position) => {
    gameObj.x = position.x;
    gameObj.y = position.y;
    gameObj.collisionBox.x = position.x;
    gameObj.collisionBox.y = position.y;
  };

  const onDrag = position => {
    update(() => {
      // gameObject.childrenIds.forEach(childId => {
      //   const child = gameObjects.find(item => item.id === childId);
      //   const offset = { x: child.x - gameObject.x, y: child.y - gameObject.y };

      //   setPosition(child, { x: position.x + offset.x, y: position.y + offset.y });
      //   updateGameObjects(child);
      // });

      setPosition(gameObject, position);
    });
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
