import React, { useState, useContext } from 'react';
import Panel from './shared/Panel';
import Row from './shared/Row';
import { Link } from 'react-router-dom';
import GlobalContext from '../../context/GlobalState';

export default function MainMenu() {
  const [nickname, setNickname] = useState('');
  // CR: To trza bedzie rozkminić czy jakiś hooks customowy jest potrzebny, żeby wywoływał ten setNickname z globalnego stanu czy jak
  // const { setNickname } = useContext(GlobalContext);

  const buttonsStyle = {
    display: 'flex',
    justifyContent: 'space-between'
  }

  return (
    <form>
      <Panel width="500px" height="300px">
        <Row size='1'>
          <label htmlFor="nickname">Nickname</label>
          <input
            type="text"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
          />
        </Row>

        <Row>
          <div style={buttonsStyle}>
            <Link to="/lobby"><button>Create</button></Link>
            <Link to="/connect"><button>Join</button></Link>     
          </div> 
        </Row>
      </Panel>
    </form>
  );
}
