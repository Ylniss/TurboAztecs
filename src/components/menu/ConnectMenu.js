import React, { useContext, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Panel from './shared/Panel';
import Row from './shared/Row';
import '../../styles.css';
import { usePeer } from '../../hooks/peer';
import { GlobalContext } from '../../context/GlobalState';
import { useAsync } from '../../hooks/async';
import { Loader } from './shared/loader/Loader';
import { usePeerMessenger } from '../../hooks/peerMessenger';

export default function ConnectMenu() {
  const { createPeer, connect } = usePeer();
  const { addPlayer, nickname, availableColors, addConnection, setPeer } = useContext(
    GlobalContext
  );
  const gameId = useRef();
  const history = useHistory();
  const { sendMessage } = usePeerMessenger();
  const { execute, pending } = useAsync(createPlayer, false);
  const [linkClass, setLinkClass] = useState('');

  const onConnect = e => {
    setLinkClass('disabled-link');
    e.preventDefault();
    execute();
  };

  async function createPlayer() {
    const playerPeer = await createPeer();
    setPeer(playerPeer);
    let player = {
      peerId: playerPeer.id,
      nickname,
      color: availableColors[0],
    };
    addPlayer(player);
    connect(playerPeer, gameId.current.value).then(connection => {
      addConnection(connection);
      sendMessage(connection, 'ADD_PLAYER', player);
      history.push('/lobby', { gameId: gameId.current.value });
    });
  }

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
