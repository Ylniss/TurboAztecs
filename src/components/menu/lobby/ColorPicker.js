import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import './LobbyMenu.css';
import { getNext } from '../../../services/arrayHelper.js';
import { usePeer } from '../../../hooks/peer';

export default function ColorPicker({ startColor }) {
  const { availableColors } = useContext(GlobalContext);
  
  startColor = startColor ? startColor : availableColors[0];

  //todo: color has to be send via peerjs to other clients
  const [color, setColor] = useState(startColor);
  const { peer, updatePlayer, nickname } = useContext(GlobalContext);
  const { sendMessage } = usePeer();

  const colorPickerStyle = {
    backgroundColor: color,
  };

  const changeColor = () => {
    setColor(getNext(availableColors, color));

    const player = {
      peerId: peer.id,
      nickname,
      color,
    };
    updatePlayer(player);
    peer.connections.forEach(conn => {
      sendMessage(conn, 'UPDATE_PLAYER', player);
    });
  };

  return <div className='color-picker' style={colorPickerStyle} onClick={changeColor}></div>;
}
