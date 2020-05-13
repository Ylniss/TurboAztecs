import React, { useContext, useRef, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Panel from './shared/Panel';
import Row from './shared/Row';
import '../../styles.css';
import { usePeer } from '../../hooks/peer';
import { useAsync } from '../../hooks/async';
import { Loader } from './shared/loader/Loader';

export default function ConnectMenu() {
  const location = useLocation();
  const { connect } = usePeer(location.state.peer);
  const gameId = useRef();
  const history = useHistory();
  const [linkClass, setLinkClass] = useState('');

  const onConnect = e => {
    setLinkClass('disabled-link');
    e.preventDefault();
    execute();
  };

  const connectToGame = () => {
    return new Promise(() => {
      if (!gameId.current.value) {
        alert('Provide game ID'); // temporary
      }

      connect(location.state.peer, gameId.current.value).then(() => {
        history.push('/lobby', { gameId: gameId.current.value, peer: location.state.peer });
      });
    });
  };

  const { execute, pending } = useAsync(connectToGame, false);

  return (
    <>
      <div>{pending && <Loader text='Connecting' />}</div>

      <Panel width='500px' height='300px'>
        <Row size='1'>
          <label htmlFor='gameId'>Game id</label>
          <input type='text' ref={gameId} />
        </Row>

        <Row>
          <div className='btn-row'>
            <Link to='/' className={linkClass}>
              <button className='btn-back'>Back</button>
            </Link>
            <Link to='/lobby' className={linkClass}>
              <button onClick={onConnect}>Connect</button>
            </Link>
          </div>
        </Row>
      </Panel>
    </>
  );
}
