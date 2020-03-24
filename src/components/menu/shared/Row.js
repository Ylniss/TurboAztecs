import React from 'react'

export default function Row(props) {
  const rowStyle = {
    display: 'flex',
    flexDirection: props.direction === 'row' ? 'row' : 'column',
    flex: props.size
  }

  return (
    <div style={rowStyle}>
      {props.children}
    </div>
  )
}
