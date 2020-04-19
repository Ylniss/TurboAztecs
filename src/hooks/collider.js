export const useCollider = () => {
  const isCollision = (circle1, circle2) => {
    var dx = circle1.x - circle2.x;
    var dy = circle1.y - circle2.y;
    var distance = Math.sqrt(dx * dx + dy * dy);

    // one contains another
    return distance < Math.abs(circle1.radius - circle2.radius);
  };

  const handleCollision = (colliders, collider, onCollision, onNonCollision) => {
    colliders.forEach(item => {
      if (isCollision(collider, item)) {
        onCollision(item);
      } else {
        onNonCollision(item);
      }
    });
  };

  return { handleCollision };
};
