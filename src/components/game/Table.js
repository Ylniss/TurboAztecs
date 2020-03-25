import React from 'react';
import './Table.css';
import tableImage from '../../assets/img/table/table.jpg';
import boardImage from '../../assets/img/table/board.jpg';

export default function Table() {

  return (
    <>
      <img  className='table' src={tableImage} alt='table'/>
      <img  className='board' src={boardImage} alt='board'/>
    </>
  )
}
