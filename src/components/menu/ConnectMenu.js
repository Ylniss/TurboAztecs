import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Panel from './shared/Panel';
import Row from './shared/Row';
import '../../styles.css';

export default function ConnectMenu() {
  const [gameId, setGameId] = useState('');

  return (
    <form>
      <Panel width='500px' height='300px'>
        <Row size='1'>
          <label htmlFor='gameId'>Game id</label>
          <input type='text' value={gameId} onChange={e => setGameId(e.target.value)} />
        </Row>

        <Row>
          <div className='btn-row'>
            <Link to='/'>
              <button className='btn-back'>Back</button>
            </Link>
            <button>Connect</button>
          </div>
        </Row>
      </Panel>
    </form>
  );
}
