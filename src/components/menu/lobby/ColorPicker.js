import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import './LobbyMenu.css';
import { getNext } from '../../../services/arrayHelper.js';

export default function ColorPicker({ startColor }) {
  const { availableColors } = useContext(GlobalContext);
  
  startColor = startColor ? startColor : availableColors[0];

  //todo: color has to be send via peerjs to other clients
  const [color, setColor] = useState(startColor);

  const colorPickerStyle = {
    backgroundColor: color,
  };

  const changeColor = () => {
    setColor(getNext(availableColors, color));
  };

  return <div className='color-picker' style={colorPickerStyle} onClick={changeColor}></div>;
}
