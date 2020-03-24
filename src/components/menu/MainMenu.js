import React, { useState, useContext } from 'react';
import Panel from './shared/Panel';
import Row from './shared/Row';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';
import { createGame, joinGame } from '../../services/peerService';

export default function MainMenu() {
  const [nickname, setNickname] = useState('');
  // CR: To trza bedzie rozkminić czy jakiś hooks customowy jest potrzebny, żeby wywoływał ten setNickname z globalnego stanu czy jak
  // const { setNickname } = useContext(GlobalContext);
  const { setGameId } = useContext(GlobalContext);

  const buttonsStyle = {
    display: 'flex',
    justifyContent: 'space-between'
  };

  const create = () => {
    let gameId = createGame();
    console.log(gameId);
    setGameId(gameId);
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
        <div style={buttonsStyle}>
          <Link to="/lobby">
            <button onClick={() => create()}>Create</button>
          </Link>
          <Link to="/connect">
            <button onClick={() => joinGame(nickname)}>Join</button>
          </Link>
        </div>
      </Row>
    </Panel>
  );
}
