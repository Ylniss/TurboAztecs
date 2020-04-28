import React, { useContext, useState } from 'react';
import Panel from './shared/Panel';
import Row from './shared/Row';
import { Link, useHistory } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';
import { usePeer } from '../../hooks/peer';
import '../../styles.css';
import { useAsync } from '../../hooks/async';
import { Loader } from './shared/loader/Loader';

export default function MainMenu() {
  const { nickname, setNickname, availableColors, addPlayer, setPeer } = useContext(GlobalContext);
  const { createPeer } = usePeer();
  const history = useHistory();
  const [linkClass, setLinkClass] = useState('');

  const onCreate = e => {
    setLinkClass('disabled-link');
    e.preventDefault();
    execute();
  };

  const createPlayer = async () => {
    return new Promise(async () => {
      createPeer().then(playerPeer => {
        setPeer(playerPeer);
        let player = {
          peerId: playerPeer.id,
          nickname,
          color: availableColors[0],
        };
        addPlayer(player);
        history.push('/lobby', { gameId: playerPeer.id });
      });
    });
  };

  const { execute, pending } = useAsync(createPlayer, false);

  return (
    <>
      <div>{pending && <Loader text='Creating' />}</div>

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
              <button>Join</button>
            </Link>
          </div>
        </Row>
      </Panel>
    </>
  );
}
