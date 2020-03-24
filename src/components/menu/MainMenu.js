import React, { useState, useContext } from 'react';
import Panel from './Panel';
import { Link } from 'react-router-dom';
import GlobalContext from '../../context/GlobalState';

export default function Main() {
  const [nickname, setNickname] = useState('');
  // CR: To trza bedzie rozkminić czy jakiś hooks customowy jest potrzebny, żeby wywoływał ten setNickname z globalnego stanu czy jak
  // const { setNickname } = useContext(GlobalContext);

  return (
    <Panel width="500px" height="300px">
      <label htmlFor="nickname">Nickname</label>
      <input
        type="text"
        value={nickname}
        onChange={e => setNickname(e.target.value)}
      />
      <Link to="/lobby">Create game</Link>
      <Link to="/connect">Join game</Link>
    </Panel>
  );
}
