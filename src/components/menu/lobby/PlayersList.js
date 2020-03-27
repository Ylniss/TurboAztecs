import React, { useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import ColorPicker from './ColorPicker';
import './LobbyMenu.css';

export default function PlayersList() {
  const { players } = useContext(GlobalContext);

  return (
    <ul className="player-list">
      {
        players.map(player => {
          return (
            <li key={player.id}>
              {player.nickname} <ColorPicker startColor={player.color} />
            </li>
          )
        })
      }
    </ul>
  )
}
