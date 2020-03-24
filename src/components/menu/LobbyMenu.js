import React, { useState } from 'react';
import Panel from './Panel';

export default function Lobby() {
  const [gameId, setGameId] = useState('');
  const [players, setPlayers] = useState([]);

  return (
    <Panel>
      Game id: {gameId} <button>Copy</button>
      <ul>
        {players.map((player, index) => {
          return <li>{player.nickname} <button></button></li>;
        })}
      </ul>
    </Panel>
  );
}
