import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import copyIcon from './copy-icon.svg';
import { copyToClipboard } from '../../../utils/clipboard.js';
import Panel from '../shared/Panel';
import Row from '../shared/Row';
import PlayersList from './PlayersList';
import { GlobalContext } from '../../../context/GlobalState.js';
import './LobbyMenu.css';
import { useHostPeer } from '../../../hooks/hostPeer';

export default function LobbyMenu() {
  const { clearPlayers, hostPeer } = useContext(GlobalContext);
  const { clearConnections } = useHostPeer();
  const [hostPeerId, setHostPeerId] = useState();
  const location = useLocation();

  useEffect(() => {
    setHostPeerId(location.state.hostPeerId);
  }, [location.state.hostPeerId]);

  const onBack = () => {
    // wszyscy peerowie też muszą zostać rozjebani i cofnięci do MainMenu/ConnectMenu
    clearConnections(hostPeer);
    clearPlayers();
  };

  return (
    <Panel width='600px' height='400px'>
      <Row size='1' itemsDirection='row'>
        <div className='game-id'>Game ID:{' ' + hostPeerId}</div>
        <img
          className='copy-icon'
          src={copyIcon}
          width='25'
          height='25'
          onClick={copyToClipboard(hostPeerId)}
          alt='copy'
        />
      </Row>

      <Row size='8.5'>
        <PlayersList />
      </Row>

      <Row>
        <div className='btn-row'>
          <Link to='/'>
            <button className='btn-back' onClick={onBack}>
              Back
            </button>
          </Link>
          <Link to='/game'>
            <button>Start</button>
          </Link>
        </div>
      </Row>
    </Panel>
  );
}
