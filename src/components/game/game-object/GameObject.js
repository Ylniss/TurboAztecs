import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import Draggable from 'react-draggable';

export const GameObject = ({ gameObjectInit, images }) => {

  const { zPositions, updateGameObjects, setZPositions } = useContext(GlobalContext);
  const [gameObject, setGameObject] = useState(gameObjectInit);

  const getGlobalZPostition = () => {
    return zPositions.filter(x => x.type === gameObject.type)[0].z;
  }

  // update gameObject only with this function
  const update = (setProps) => {
    setProps();
    setGameObject(gameObject);
    // todo: recount aspect ratio before updating gameObjects
    updateGameObjects(gameObject);
    console.log(`${gameObject.name} (${gameObject.id}) updated!`);
  }

  // on init
  useEffect(() => {
    update(() => gameObject.z = getGlobalZPostition());
    console.log(`${gameObject.name} (${gameObject.id}) rendered!`);
  }, []);

  const onDragStart = () => {
    let zPosition = getGlobalZPostition();
    update(() => gameObject.z = ++zPosition);
    setZPositions(zPositions.map(item => item.type === gameObject.type ? { type: item.type, z: zPosition } : item));
    console.log(gameObject.name + ' X: ' + gameObject.x + ' Y: ' + gameObject.y + ' Z: ' + gameObject.z);
  }

  const onDrag = (position) => {
    update(() => {
      gameObject.x = position.x;
      gameObject.y = position.y;
    });
    console.log(gameObject.name + ' X: ' + gameObject.x + ' Y: ' + gameObject.y + ' Z: ' + gameObject.z);
  }

  const onDragEnd = () => {

  }

  return (
    <Draggable
      bounds='.table'
      defaultPosition={{ x: gameObject.x, y: gameObject.y }} //todo: it should take recalculated x and y for user browser size
      position={null}
      onStart={onDragStart}
      onDrag={onDrag}
      onStop={onDragEnd}
      >
        
      <img
        className={gameObject.type !== 'diamond' ? 'shadow-around' : ''}
        style={{
          position: 'relative',
          zIndex: gameObject.z,
          height: gameObject.height,
          transform: `rotate(${gameObject.turn * 90}deg)`
        }}
        draggable='false'
        src={images[gameObject.name + '.png']}
        alt={gameObject.name}
      />
    </Draggable>
  )
}