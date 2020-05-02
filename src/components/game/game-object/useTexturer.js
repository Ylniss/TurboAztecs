import { useState, useEffect } from 'react';

export const useTexturer = (images, type, name) => {
  const [backTexture, setBackTexture] = useState();
  const [textures, setTextures] = useState();

  useEffect(() => {
    console.log('entered texturer useEffect.');
    console.log(type);
    console.log(name);

    switch (type) {
      case 'tile':
        setBackTexture(images['explosed-tile.png']);
        switch (name) {
          case 'crossing-tile':
            setTextures([images[name + '.png']]);
            break;
          case 'straight-tile':
            setTextures([images[name + '0.png'], images[name + '1.png']]);
            break;
          default:
            setTextures([
              images[name + '0.png'],
              images[name + '1.png'],
              images[name + '2.png'],
              images[name + '3.png'],
            ]);
        }
        break;
      case 'item':
        setTextures([images[name + '.png']]);
        setBackTexture(images['rubble.png']);
        break;
      default:
        setTextures([images[name + '.png']]);
    }
  }, []);

  return { textures, backTexture };
};
