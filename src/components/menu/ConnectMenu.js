import React, { useState } from 'react';
import Panel from './Panel';
import { connect } from '../../services/connectionService';

export default function ConnectMenu() {
  const [gameId, setGameId] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    connect(gameId);
  }

  return (
    <Panel width="500px" height="300px">
      <form onSubmit={ onSubmit }>
        <label htmlFor="gameId">Game id</label>
        <input
          type="text"
          value={gameId}
          onChange={e => setGameId(e.target.value)}
        />
        <button>Connect</button>
      </form>
    </Panel>
  );
}
