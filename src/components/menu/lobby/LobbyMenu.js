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
import { usePeerMessenger } from '../../../hooks/peerMessenger';

export default function LobbyMenu() {
  const { clearPlayers, peer, players, connections, nickname, availableColors } = useContext(
    GlobalContext
  );
  const { clearConnections } = usePeer();
  const [gameId, setGameId] = useState();
  const location = useLocation();
  const [linkClass, setLinkClass] = useState('disabled-link');
  const { sendMessage } = usePeerMessenger();

  useEffect(() => {
    setGameId(location.state.gameId);
  }, [location.state.gameId]);

  useEffect(() => {
    const player = {
      peerId: peer.id,
      nickname,
      color: availableColors[0],
    };
    connections.forEach(conn => {
      sendMessage(conn, 'ADD_PLAYER', player);
    });
  }, [connections]);

  useEffect(() => {
    const playersColors = new Set(players.map(player => player.color));

    // check if the are at least 2 players and their colors are all differnt
    if (players.length > 1 && playersColors.size === players.length) {
      setLinkClass('');
    } else {
      setLinkClass('disabled-link');
    }
  }, [players]);

  const onBack = () => {
    clearConnections(peer);
    clearPlayers();
  };

  window.onbeforeunload = e => {
    connections.forEach(conn => {
      sendMessage(conn, 'DELETE_PLAYER', peer.id);
    });
    clearConnections(peer);
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
          onClick={() => copyToClipboard(gameId)}
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
          <Link to='/game' className={linkClass}>
            <button>Start</button>
          </Link>
        </div>
      </Row>
    </Panel>
  );
}
