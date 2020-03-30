import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import Draggable from 'react-draggable';
import './GameObject.css';

const importGameObjectImages = () => { //todo: better to move it outside so its not called every time when game object is re rendered....
  const req = require.context('../../../assets/img/game-objects', false, /\.(png|jpe?g|svg)$/)

  let images = {};
  req.keys().map(item => { images[item.replace('./', '')] = req(item); });

  return images;
}

export const GameObject = ({ gameObjectInit }) => {

  const { zPositions, updateGameObject, setZPositions } = useContext(GlobalContext);

  const [gameObject, setGameObject] = useState(gameObjectInit);

  const getCurrentZPostition = () => {
    return zPositions.filter(x => x.type === gameObject.type)[0].z;
  }

  useEffect(() => {
    gameObject.z = getCurrentZPostition();
    setGameObject(gameObject);
  }, []);

  console.log(`${gameObject.name} (${gameObject.id}) rendered!`);

  // todo: changing of gameobject in global state of all game objects
  // and there on every action trigger send updated state to ALL peers
  const onDragStart = () => {
    let zPosition = getCurrentZPostition();
    //setZPositions(zPositions.map(x => x.type === gameObject.type )); //todo: to ogarnac
    gameObject.z = ++zPosition;
    setGameObject(gameObject);
    console.log(gameObject.name + ' ' + gameObject.x + ' ' + gameObject.y + ' ' + gameObject.z);
    updateGameObject(gameObject);
    
  }

  const onDrag = (position) => {
    gameObject.x = position.x;
    gameObject.y = position.y;
    setGameObject(gameObject);
    updateGameObject(gameObject);
    console.log(gameObject.name + ' ' + gameObject.x + ' ' + gameObject.y + ' ' + gameObject.z);
  }

  const onDragEnd = () => {

  }

  const images = importGameObjectImages();
  return (
      <Draggable
        handle={`.${gameObject.type}`}
        defaultPosition={{x: gameObject.x, y: gameObject.y}}
        position={null}
        onStart={onDragStart}
        onDrag={onDrag}
        onStop={onDragEnd}>
          <img 
            className={gameObject.type !== 'diamond' ? gameObject.type + ' shadow-around' : gameObject.type}
            style={{zIndex: gameObject.z}}
            draggable="false"
            src={images[gameObject.name + '.png']}
            alt={gameObject.name} 
          />
      </Draggable>
  )
}