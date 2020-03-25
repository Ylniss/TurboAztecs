import React, { useState } from 'react';
import './LobbyMenu.css';
import { getNext } from '../../../services/arrayHelper.js';

const availableColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];

export default function ColorPicker({startColor}) {
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