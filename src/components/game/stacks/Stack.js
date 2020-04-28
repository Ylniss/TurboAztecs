import React, { useState, useEffect, useRef, useContext } from 'react';
import { Sprite, useTick } from '@inlet/react-pixi';
import { GlobalContext } from '../../../context/GlobalState';
import stackImage from '../../../assets/img/table/stack.png';
import { useSpawner } from '../../../hooks/spawner';

export const Stack = ({ id }) => {
  const { stacks, gameObjects } = useContext(GlobalContext);
  const self = useRef(stacks[id]).current;
  const spawnPoint = useRef({ x: self.x + 17, y: self.y - 8 });
  const [scale, setScale] = useState(0.233);
  const [topItemId, setTopItemId] = useState();
  const [initialized, setInitialized] = useState(false);
  const { spawn } = useSpawner();

  const getFromTop = () => {
    if (self.content.length === 0) return;

    const last = self.content.pop();
    let itemId = spawn(last, spawnPoint.current.x, spawnPoint.current.y);
    setTopItemId(itemId);
    if (self.content.length === 1) {
      // todo networking: send msg to refill

      
    }
  };

  useEffect(() => {
    if (self.type === 'item') {
      spawnPoint.current = { x: self.x + 5, y: self.y - 8 };
      setScale(0.114);
    }

    getFromTop();
    setInitialized(true);
  }, []);

  useTick(delta => {
    if (!initialized) return;

    if (
      gameObjects[topItemId].x !== spawnPoint.current.x ||
      gameObjects[topItemId].y !== spawnPoint.current.y
    ) {
      getFromTop();
    }
  });

  return <Sprite image={stackImage} x={self.x} y={self.y} scale={scale} />;
};
