import React, { useContext, useState } from 'react';
import Panel from './shared/Panel';
import Row from './shared/Row';
import { Link, useHistory } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';
import { usePeer } from '../../hooks/peer';
import '../../styles.css';
import { useAsync } from '../../hooks/async';
import { Loader } from './shared/Loader';

export default function MainMenu() {
  const { nickname, setNickname, addPlayer, setPeer } = useContext(GlobalContext);
  const { createPeer } = usePeer();
  const history = useHistory();
  const [linkClass, setLinkClass] = useState('');

  // host player
  const onCreate = e => {
    setLinkClass('disabled-link');
    e.preventDefault();
    onCreateHostPlayer();
  };

  const createHostPlayer = async () => {
    return new Promise(async () => {
      createPeer().then(playerPeer => {
        setPeer(playerPeer);
        let player = {
          peerId: playerPeer.id,
          nickname,
        };
        addPlayer(player);
        history.push('/lobby', { gameId: playerPeer.id, peer: playerPeer });
      });
    });
  };

  const { execute: onCreateHostPlayer, pending } = useAsync(createHostPlayer, false);

  // normal player
  const onConnect = e => {
    setLinkClass('disabled-link');
    e.preventDefault();
    onCreateNormalPlayer();
  };

  const createNormalPlayer = () => {
    return new Promise(() => {
      createPeer().then(playerPeer => {
        setPeer(playerPeer);
        const player = {
          peerId: playerPeer.id,
          nickname,
        };
        addPlayer(player);
        history.push('/connect', { peer: playerPeer })
      });
    });
  };

  const { execute: onCreateNormalPlayer, pending2 } = useAsync(createNormalPlayer, false);

  return (
    <>
      <div>{pending && <Loader text='Creating' />}</div>
      <div>{pending2 && <Loader text='Creating' />}</div>

      <Panel width='500px' height='300px'>
        <Row size='1'>
          <label htmlFor='nickname'>Nickname</label>
          <input type='text' value={nickname} onChange={e => setNickname(e.target.value)} />
        </Row>

        <Row>
          <div className='btn-row'>
            <Link to='/lobby' className={linkClass}>
              <button onClick={onCreate}>Create</button>
            </Link>
            <Link to='/connect' className={linkClass}>
              <button onClick={onConnect}>Join</button>
            </Link>
          </div>
        </Row>
      </Panel>
    </>
  );
}
