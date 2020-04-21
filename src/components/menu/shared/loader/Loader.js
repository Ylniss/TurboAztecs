import React from 'react';
import loaderImage from '../../../../assets/img/loader.png';
import './loader.css';

export const Loader = ({ text }) => {
  return (
    <>
      <div className='overlay'></div>
      <img className='loader' src={loaderImage} alt='loader' />
      <div className='loader-text'>{text}</div>
    </>
  );
};
