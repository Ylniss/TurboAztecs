import React, { useContext, useState } from 'react';
import Panel from './shared/Panel';
import Row from './shared/Row';
import { Link, useHistory } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';
import { useHostPeer } from '../../hooks/hostPeer';
import '../../styles.css';
import { useAsync } from '../../hooks/async';
import { Loader } from './shared/Loader';

export default function MainMenu() {
  const { nickname, setNickname, availableColors, addPlayer } = useContext(GlobalContext);
  const { createHostPeer } = useHostPeer();
  const history = useHistory();
  const [linkClassName, setLinkClassName] = useState('');

  const onCreate = e => {
    setLinkClassName('disabled-link');
    e.preventDefault();
    execute();
  };

  const createHost = () => {
    return new Promise((resolve, reject) => {
      createHostPeer().then(hostPeer => {
        let host = {
          peerId: hostPeer.id,
          nickname,
          color: availableColors[0],
        };
        addPlayer(host);
        history.push('/lobby', { hostPeerId: hostPeer.id });
      });
    });
  };

  const { execute, pending } = useAsync(createHost, false);

  return (
    <>
      {/* It works because in JavaScript, true && expression always evaluates to expression, and false && expression always evaluates to false. */}
      <div>{pending && <Loader />}</div>

      <Panel width='500px' height='300px'>
        <Row size='1'>
          <label htmlFor='nickname'>Nickname</label>
          <input type='text' value={nickname} onChange={e => setNickname(e.target.value)} />
        </Row>

        <Row>
          <div className='btn-row'>
            <Link to='/lobby' className={linkClassName}>
              <button onClick={onCreate}>Create</button>
            </Link>
            <Link to='/connect' className={linkClassName}>
              <button>Join</button>
            </Link>
          </div>
        </Row>
      </Panel>
    </>
  );
}
