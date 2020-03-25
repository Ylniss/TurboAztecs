import React from 'react'
import PropTypes from "prop-types";

export default function Panel(props) {
  
  const panelStyle = {
    background: '#383838',
    border: 'none',
    padding: '30px',
    borderRadius: '10px',
    width: props.width,
    height: props.height,

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
      {props.children}
    </div>
  )
}

Panel.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired
}