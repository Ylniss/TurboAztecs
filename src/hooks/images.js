import { useState, useLayoutEffect } from 'react';

export const useImages = () => {
  const [images, setImages] = useState();

  useLayoutEffect(() => {
    const importGameObjectImages = () => {
      const req = require.context('../assets/img/game-objects', false, /\.(png|jpe?g|svg)$/)
  
      let images = {};
      req.keys().map(item => { images[item.replace('./', '')] = req(item); });
      
      return images;
    }

    setImages(importGameObjectImages());
  }, []);

  return images;
}
