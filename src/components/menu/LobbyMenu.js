import React, { useState } from 'react';
import copyIcon from '../../assets/img/copy-icon.svg';
import { copyToClipboard } from '../../services/clipboardService.js';
import Panel from './shared/Panel';
import Row from './shared/Row';

export default function LobbyMenu() {
  const [gameId, setGameId] = useState('sdgwergerg34rf43'); //temporary init value for tests
  const [players, setPlayers] = useState([]);

  const imgStyle = {
    marginLeft: '12px'
  };

  return (
    <Panel width="600px" height="400px">
      <Row size="1" direction="row">
        Game id: <span>{gameId}</span>
        <img
          style={imgStyle}
          src={copyIcon}
          width="15"
          height="15"
          onClick={copyToClipboard(gameId)}
        />
      </Row>

      <Row>
        <ul>
          {players.map((player, index) => {
            return (
              <li>
                {player.nickname} <button></button>
              </li>
            );
          })}
        </ul>
      </Row>
    </Panel>
  );
}
