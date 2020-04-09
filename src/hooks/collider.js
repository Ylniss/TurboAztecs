import React from 'react';

export const useCollider = () => {
  const isCollision = (a, b) => {
    return !(
      a.y + a.height < b.y ||
      a.y > b.y + b.height ||
      a.x + a.width < b.x ||
      a.x > b.x + b.width
    );
  };

  const handleCollision = (colliders, collider, onCollision) => {
    colliders.forEach(item => {
      if (isCollision(collider, item)) {
        onCollision(item);
      }
    });
  };

  return { handleCollision };
};
