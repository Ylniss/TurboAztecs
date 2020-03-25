import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import copyIcon from './copy-icon.svg';
import { copyToClipboard } from '../../../services/clipboardService.js';
import Panel from '../shared/Panel';
import Row from '../shared/Row';
import PlayersList from './PlayersList';
import './LobbyMenu.css';

export default function LobbyMenu() {
  const [gameId, setGameId] = useState('sdgwergerg34rf43'); //temporary init value for tests


  return (
    <Panel width="600px" height="400px">
      <Row size='1' direction='row'>
        <div className="game-id">Game ID:{' ' + gameId}</div>
        <img className="copy-icon"
          src={copyIcon}
          width='25' height='25'
          onClick={copyToClipboard(gameId)}
          alt="copy"
        />
      </Row>
      
      <Row size='8.5'>
        <PlayersList />
      </Row>

      <Row>
        <div className="btn-row">
          <Link to="/"><button className="btn-back">Back</button></Link>
          <Link to="/game"><button>Start</button></Link>
        </div>
      </Row>
    </Panel>
  );
}
