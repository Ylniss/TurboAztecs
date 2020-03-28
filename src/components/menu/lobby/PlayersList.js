import React, { useContext } from 'react';
import ColorPicker from './ColorPicker';
import './LobbyMenu.css';
import { GlobalContext } from '../../../context/GlobalState';

export default function PlayersList() {
  const { players } = useContext(GlobalContext);

  return (
    <ul className="player-list">
      {players.map(player => {
        return (
          <li key={player.peer.id}>
            {player.nickname} <ColorPicker startColor={player.color} />
          </li>
        );
      })}
    </ul>
  );
}
