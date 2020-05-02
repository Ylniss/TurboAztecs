import React, { useContext } from 'react';
import { GlobalContext, GlobalProvider } from '../../../context/GlobalState';
import { useContextMenuPreventer } from './useContextMenuPreventer';
import { Stage } from '@inlet/react-pixi';
import { Game } from './Game';

import './Table.css';

import tableImage from '../../../assets/img/table/table.jpg';

export const Table = () => {
  const { players } = useContext(GlobalContext);
  useContextMenuPreventer();

  return (
    <>
      <img className='table' draggable='false' src={tableImage} alt='table' />

      <div style={{ position: 'relative' }}>
        <Stage options={{ resizeTo: window, transparent: true }}>
          <GlobalProvider>
            <Game players={players} />
          </GlobalProvider>
        </Stage>
      </div>
    </>
  );
};
