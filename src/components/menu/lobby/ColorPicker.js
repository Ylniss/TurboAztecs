import React, { useState } from 'react';
import './LobbyMenu.css';
import { getNext } from '../../../services/arrayHelper.js';

const availableColors = ['#47cf31', '#0c81f2', '#d2952b', '#808080'];

export default function ColorPicker({ startColor }) {
  startColor = startColor ? startColor : availableColors[0];

  //todo: color has to be send via peerjs to other clients
  const [color, setColor] = useState(startColor);

  const colorPickerStyle = {
    backgroundColor: color
  }

  const changeColor = () => {
    setColor(getNext(availableColors, color));
  }

  return (
    <div className='color-picker'
      style={colorPickerStyle}
      onClick={changeColor}>
    </div>
  )
}