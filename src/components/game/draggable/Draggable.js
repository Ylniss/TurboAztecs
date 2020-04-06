import React, { useState, useRef } from 'react';
import { useAspectRatioContainer } from '../../../hooks/aspectRatioContainer';

export const Draggable = ({ children, startPosition, onStart, onDrag, onStop }) => {
  const [width, height] = useAspectRatioContainer(9 / 16);
  const [{ x, y }, setPosition] = useState({
    x: startPosition.x,
    y: startPosition.y,
  });
  const relX = useRef(0);
  const relY = useRef(0);
  const elementRef = useRef(null);

  const onStartDrag = e => {
    const element = elementRef.current;
    const parentBox = element.parentElement.getBoundingClientRect();
    const box = element.getBoundingClientRect();
    relX.current = e.pageX - box.left + parentBox.left;
    relY.current = e.pageY - box.top + parentBox.top;
    onStart && onStart();
  };

  const onMove = e => {
    const newX = (Math.trunc(e.pageX - relX.current) / width) * 100;
    const newY = (Math.trunc(e.pageY - relY.current) / height) * 100;
    if (newX !== x || newY !== y) {
      setPosition({ x: newX, y: newY });
      onDrag && onDrag({ x: newX, y: newY });
    }
  };

  const onMouseDown = e => {
    if (e.button !== 0) return;
    onStartDrag(e);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    e.preventDefault();
  };

  const onMouseUp = e => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    onStop && onStop(x, y);
    e.preventDefault();
  };

  const onMouseMove = e => {
    onMove(e);
    e.preventDefault();
  };

  const onTouchStart = e => {
    onStartDrag(e.touches[0]);
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd, { passive: false });
    e.preventDefault();
  };

  const onTouchMove = e => {
    onMove(e.touches[0]);
    e.preventDefault();
  };

  const onTouchEnd = e => {
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
    onStop && onStop(x, y);
    e.preventDefault();
  };

  return (
    <div
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        touchAction: 'none',
        height: '100%',
      }}
      ref={elementRef}
    >
      {children}
    </div>
  );
};
