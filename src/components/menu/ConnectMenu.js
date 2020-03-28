import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Panel from './shared/Panel';
import Row from './shared/Row';
import '../../styles.css';
import { connect } from '../../services/connectionService';
import { createPlayerPeer } from '../../services/peerService';
import { GlobalContext } from '../../context/GlobalState';
import { getNext } from '../../services/arrayHelper';

export default function ConnectMenu() {
  const [gameId, setGameId] = useState('');
  const { availableColors, hostPeer, nickname, addPlayer } = useContext(GlobalContext)

  const connectStyle = {
    display: 'flex',
    justifyContent: 'center'
  };

  const connect = () => {
    createPlayerPeer((peer) => {
      addPlayer({ peer, nickname,  });
      connect(gameId);
    });
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
        <div className="btn-row">
          <Link to="/"><button className="btn-back">Back</button></Link>
          <Link to="/lobby"><button onClick={connect}>Connect</button></Link>
        </div>
      </Row>
    </Panel>
  );
}
