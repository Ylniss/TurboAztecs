import React, { useState, useContext, useEffect } from 'react';
import './LobbyMenu.css';
import { getNext } from '../../../services/arrayHelper.js';
import { GlobalContext } from '../../../context/GlobalState';
import { usePeerMessenger } from '../../../hooks/peerMessenger';

export default function ColorPicker({ startColor }) {
  const { availableColors } = useContext(GlobalContext);
  
  startColor = startColor ? startColor : availableColors[0];

  //todo: color has to be send via peerjs to other clients
  const [color, setColor] = useState(startColor);
  const { peerId, updatePlayer, nickname, hostConnections, clientConnection, players } = useContext(GlobalContext);
  const { sendMessage } = usePeerMessenger();

  const colorPickerStyle = {
    backgroundColor: color,
  };
  
  useEffect(() => {
    const player = {
      peerId,
      nickname,
      color
    };
    updatePlayer(player);

    if (clientConnection) {
      sendMessage(clientConnection, 'UPDATE_PLAYER', player);
    }

    hostConnections.forEach(connection => sendMessage(connection, 'SET_PLAYERS', players));
  }, [color])

  const changeColor = () => {
    setColor(getNext(availableColors, color));
  };

  return <div className='color-picker' style={colorPickerStyle} onClick={changeColor}></div>;
}
