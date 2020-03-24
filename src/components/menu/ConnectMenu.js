import React, { useState } from 'react';
import Panel from './shared/Panel';
import Row from './shared/Row';
import { connect } from '../../services/connectionService';

export default function ConnectMenu() {
  const [gameId, setGameId] = useState('');

  const connectStyle = {
    display: 'flex',
    justifyContent: 'center'
  };

  const connect = (e) => {
    e.preventDefault();
    connect(gameId);
  }

  return (
    <Panel width="500px" height="300px">
      <Row size="1">
        <label htmlFor="gameId">Game id</label>
        <input
          type="text"
          value={gameId}
          onChange={e => setGameId(e.target.value)}
        />
      </Row>

      <Row>
        <div style={connectStyle}>
          <button onClick={connect}>Connect</button>
        </div>
      </Row>
    </Panel>
  );
}
