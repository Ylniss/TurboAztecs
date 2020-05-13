import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import copyIcon from './copy-icon.svg';
import { copyToClipboard } from '../../../services/clipboardService.js';
import Panel from '../shared/Panel';
import Row from '../shared/Row';
import PlayersList from './PlayersList';
import { GlobalContext } from '../../../context/GlobalState.js';
import './LobbyMenu.css';
import { usePeer } from '../../../hooks/peer';

export default function LobbyMenu() {
  const { clearPlayers, peer, players } = useContext(GlobalContext);
  const location = useLocation();
  const { clearPeer } = usePeer(location.state.peer);
  const [gameId, setGameId] = useState();
  const [linkClass, setLinkClass] = useState('disabled-link');

  useEffect(() => {
    setGameId(location.state.gameId);
  }, [location.state.gameId]);

  useEffect(() => {
    const playersColors = new Set(players.map(player => player.color));

    // check if the are at least 2 players and their colors are all different
    if (players.length > 1 && playersColors.size === players.length) {
      setLinkClass('');
    } else {
      setLinkClass('disabled-link');
    }
  }, [players]);

  const onBack = () => {
    clearPeer(peer);
    clearPlayers();
  };

  window.onbeforeunload = e => {
    clearPeer(peer);
  };

  return (
    <Panel width='600px' height='400px'>
      <Row size='1' itemsDirection='row'>
        <div className='game-id'>Game ID:{' ' + gameId}</div>
        <img
          className='copy-icon'
          src={copyIcon}
          width='25'
          height='25'
          onClick={copyToClipboard(gameId)}
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
