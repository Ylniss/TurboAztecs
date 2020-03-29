import React from 'react';
import { PlayerPanels } from '../player-panels/PlayerPanels';
import './Table.css';

import tableImage from '../../../assets/img/table/table.jpg';
import boardImage from '../../../assets/img/table/board.jpg';

import { tiles, items } from '../setup-counts.json';

const importGameObjectImages = () => {
  const req = require.context('../../../assets/img/game-objects', false, /\.(png|jpe?g|svg)$/)

  let images = {};
  req.keys().map(item => { images[item.replace('./', '')] = req(item); });

  return images;
}

export const Table = () => {
  console.log(tiles);
  console.log(items);

  const images = importGameObjectImages();

  return (
    <>
      <img className='table' src={tableImage} alt='table' />
      <img className='board shadow' src={boardImage} alt='board' />

      <PlayerPanels />

      <img className='tile shadow' src={images[tiles[0].name]} alt='tile' />
      <img className='item diamond' src={images[items[0].name]} alt='item' />
      <img className='item shadow' src={images[items[1].name]} alt='item' />
    </>
  )
}
