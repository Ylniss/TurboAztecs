import React, { useEffect, useRef, useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import { useCollider } from './useCollider';
import DraggableSprite from './DraggableSprite';
import Collider from './Collider';

export const GameObject = ({ id, images }) => {
  const { zPositions, gameObjects } = useContext(GlobalContext);
  const self = useRef(gameObjects[id]).current;
  const { handleCollision } = useCollider();

  useEffect(() => {
    // -1 because when getting from stack we want newly spawned to be under one that is taken
    gameObjects[id].z = zPositions[self.type] - 1;
    console.log(`${self.name} (${id}) rendered!`);
  }, []);

  const setPosition = (gameObject, x, y) => {
    gameObject.x = x;
    gameObject.y = y;
    gameObject.collisionCircle.x = x + gameObject.collisionCircleOffset.x;
    gameObject.collisionCircle.y = y + gameObject.collisionCircleOffset.y;
  };

  const onDragStart = () => {
    gameObjects[id].z = ++zPositions[self.type];
  };

  const moveChildren = position => {
    self.childrenIds.forEach(childId => {
      const offset = {
        x: gameObjects[childId].x - self.x,
        y: gameObjects[childId].y - self.y,
      };
      setPosition(gameObjects[childId], position.x + offset.x, position.y + offset.y);
    });
  };

  const onDrag = position => {
    moveChildren(position);
    setPosition(gameObjects[id], position.x, position.y);

    console.log(self.name + ' X: ' + self.x + ' Y: ' + self.y + ' Z: ' + self.z);
  };

  const getOtherColliders = () => {
    return Object.values(gameObjects)
      .filter(gameObject => gameObject !== self) // don't check collision with itself
      .map(gameObject => gameObject.collisionCircle);
  };

  const onDragEnd = () => {
    const colliders = getOtherColliders();
    handleCollision(colliders, self.collisionCircle, onCollision, onNonCollision);
  };

  const onCollision = collided => {
    // add smaller object to bigger
    if (self.collisionCircle.radius < collided.radius) {
      removeChildFromAll(self);
      addChild(gameObjects[collided.id], self);
    } else {
      removeChildFromAll(gameObjects[collided.id]);
      addChild(self, gameObjects[collided.id]);
    }
  };

  const onNonCollision = nonCollided => {
    removeChild(gameObjects[nonCollided.id], self);
  };

  const addChild = (parent, child) => {
    const children = parent.childrenIds;
    if (!children.includes(child.id)) {
      children.push(child.id);
      console.log(`${child.id} added to ${parent.id}`);
    }
  };

  const removeChild = (parent, child) => {
    const children = parent.childrenIds;
    if (children.includes(child.id)) {
      parent.childrenIds = children.filter(id => id !== child.id);
      console.log(`${child.id} removed from ${parent.id}`);
    }
  };

  const removeChildFromAll = child => {
    Object.values(gameObjects).forEach(gameObject => removeChild(gameObject, child));
  };

  return (
    <>
      <DraggableSprite
        onStart={onDragStart}
        onDrag={onDrag}
        onStop={onDragEnd}
        id={id}
        gameObjects={gameObjects}
        image={images[self.name + '.png']}
        x={self.x}
        y={self.y}
        zIndex={self.z ? self.z : 0}
      />
      {/* visual representation of collider, uncomment for debug purpose only */}
      {/* <Collider id={id} gameObjects={gameObjects} /> */}
    </>
  );
};
