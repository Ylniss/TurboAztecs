import { useState, useEffect } from 'react';

export const useTextureNamesPicker = (images, type, name) => {
  const [backTextureName, setBackTextureName] = useState();
  const [textureNames, setTextureNames] = useState();

  useEffect(() => {
    switch (type) {
      case 'tile':
        setBackTextureName(images['exploded-tile.png']);
        switch (name) {
          case 'crossing-tile':
            setTextureNames([images[name + '.png']]);
            break;
          case 'straight-tile':
            setTextureNames([images[name + '0.png'], images[name + '1.png']]);
            break;
          default:
            setTextureNames([
              images[name + '0.png'],
              images[name + '1.png'],
              images[name + '2.png'],
              images[name + '3.png'],
            ]);
        }
        break;
      case 'item':
        setTextureNames([images[name + '.png']]);
        setBackTextureName(images['rubble.png']);
        break;
      default:
        setTextureNames([images[name + '.png']]);
    }
  }, []);

  return { textureNames, backTextureName };
};
