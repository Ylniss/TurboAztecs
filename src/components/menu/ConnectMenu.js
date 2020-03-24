import React, { useState } from 'react';
import Panel from './Panel';

export default function ConnectMenu() {
  const [gameId, setGameId] = useState('');

  return (
    <Panel>
      <form>
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
