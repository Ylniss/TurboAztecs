/* eslint-disable no-use-before-define */
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
  const [linkClass, setLinkClass] = useState('');

  const onConnect = e => {
    setLinkClass('disabled-link');
    e.preventDefault();
    execute();
  };

  const createPlayer = () => {
    return new Promise(() => {
      if (gameId.current.value) {
        createPeer().then(playerPeer => {
          setPeer(playerPeer);
          const player = {
            peerId: playerPeer.id,
            nickname,
            color: availableColors[0],
          };
          addPlayer(player);

          connect(playerPeer, gameId.current.value).then(connection => {
            addConnection(connection);
            history.push('/lobby', { gameId: gameId.current.value });
          });
        });
      } else {
        alert('Provide game ID'); // temporary
      }

      // const playerPeer = await createPeer();
      // setPeer(playerPeer);
      // let player = {
      //   peerId: playerPeer.id,
      //   nickname,
      //   color: availableColors[0],
      // };
      // addPlayer(player);

      // const connection = await connect(playerPeer, gameId.current.value);
      // addConnection(connection);
      // // setTimeout(() => {
      // // sendMessage(connection, 'ADD_PLAYER', player);
      // // }, 3000);
      // history.push('/lobby', { gameId: gameId.current.value });
    });
  };

  const { execute, pending } = useAsync(createPlayer, false);

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
