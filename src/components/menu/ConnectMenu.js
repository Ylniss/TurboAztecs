import React, { useContext, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Panel from './shared/Panel';
import Row from './shared/Row';
import '../../styles.css';
import { useClientPeer } from '../../hooks/clientPeer';
import { GlobalContext } from '../../context/GlobalState';
import { useAsync } from '../../hooks/async';
import { Loader } from './shared/Loader';
import { usePeerMessenger } from '../../hooks/peerMessenger';

export default function ConnectMenu() {
  const { createPlayerPeer, connectToHost } = useClientPeer();
  const { addPlayer, nickname, availableColors, setClientConnection } = useContext(GlobalContext);
  const hostPeerId = useRef();
  const history = useHistory();
  const { sendMessage } = usePeerMessenger();

  const onConnect = e => {
    e.preventDefault();
    execute();
  };

  const createPlayer = () => {
    return new Promise(() => {
      createPlayerPeer().then(playerPeer => {
        let player = {
          peerId: playerPeer.id,
          nickname,
          color: availableColors[0],
        };
        addPlayer(player);
        connectToHost(playerPeer, hostPeerId.current.value).then(connection => {
          setClientConnection(connection);
          sendMessage(connection, 'player', player);
          history.push('/lobby', { hostPeerId: hostPeerId.current.value });
        });
      });
    });
  };

  const { execute, pending } = useAsync(createPlayer, false);

  const connectStyle = {
    display: 'flex',
    justifyContent: 'center',
  };

  return (
    <>
      <div>{pending && <Loader />}</div>

      <Panel width='500px' height='300px'>
        <Row size='1'>
          <label htmlFor='gameId'>Game id</label>
          <input type='text' ref={hostPeerId} />
        </Row>

        <Row>
          <div className='btn-row'>
            <Link to='/'>
              <button className='btn-back'>Back</button>
            </Link>
            <Link to='/lobby'>
              <button onClick={onConnect}>Connect</button>
            </Link>
          </div>
        </Row>
      </Panel>
    </>
  );
}
