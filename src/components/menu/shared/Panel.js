import React from 'react'
import PropTypes from "prop-types";

export default function Panel({ children, width, height }) {

  const panelStyle = {
    background: '#383838',
    border: 'none',
    padding: '30px',
    borderRadius: '10px',
    width: width,
    height: height,

    display: 'flex',
    flexDirection: 'column',

    //center horizontaly and vertically
    margin: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    //shadow
    WebkitBoxShadow: "3px 3px 5px 2px #111",
    MozBoxShadow: "3px 3px 5px 2px #111",
    BoxShadow: "3px 3px 5px 2px #111"
  }

  return (
    <div style={panelStyle}>
      {children}
    </div>
  )
}

Panel.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired
}