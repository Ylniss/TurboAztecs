import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import ColorPicker from './ColorPicker';
import './LobbyMenu.css';
import { usePeerMessenger } from '../../../hooks/peerMessenger';

export default function PlayersList() {
  const { players, connections } = useContext(GlobalContext);
  const { sendMessage } = usePeerMessenger();

  // useEffect(() => {
  //   hostConnections.forEach(connection => {
  //     sendMessage(connection, 'SET_PLAYERS', players);
  //   });
  // }, [players]);

  return (
    <ul className='player-list'>
      {players.map(player => {
        return (
          <li key={player.peerId}>
            {player.nickname} <ColorPicker startColor={player.color} />
          </li>
        );
      })}
    </ul>
  );
}
