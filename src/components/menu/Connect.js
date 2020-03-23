import React, { useState } from 'react';
import Panel from './Panel';

export default function Connect() {
  const [gameId, setGameId] = useState('');

  return (
    <>
      <Panel>
        <form>
          <label for="gameId">Game id</label>
          <input
            type="text"
            value={gameId}
            onChange={e => setGameId(e.target.value)}
          />
        </form>
      </Panel>
    </>
  );
}
