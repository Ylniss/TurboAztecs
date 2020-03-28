import React, { useState, useContext } from 'react';
import Panel from './shared/Panel';
import Row from './shared/Row';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';
import { createHostPeer, createPlayerPeer } from '../../services/peerService';
import '../../styles.css';
import { getNext } from '../../services/arrayHelper';

export default function MainMenu() {
  const [nickname, setNickname] = useState('');
  // CR: To trza bedzie rozkminić czy jakiś hooks customowy jest potrzebny, żeby wywoływał ten setNickname z globalnego stanu czy jak
  // const { setNickname } = useContext(GlobalContext);
  const { availableColors, setHostPeer, addPlayer, players } = useContext(GlobalContext);

  const onCreate = () => {
    createHostPeer((peer) => {
      setHostPeer(peer);
      addPlayer({ peer, nickname, color: availableColors[0] });
    });
  }

  const onJoin = () => {
    
  }

  return (
    <Panel width="500px" height="300px">
      <Row size="1">
        <label htmlFor="nickname">Nickname</label>
        <input
          type="text"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
        />
      </Row>

      <Row>
        <div className='btn-row'>
          <Link to="/lobby">
            <button onClick={() => onCreate()}>Create</button>
          </Link>
          <Link to="/connect">
            <button onClick={() => onJoin()}>Join</button>
          </Link>
        </div>
      </Row>
    </Panel>
  );
}
