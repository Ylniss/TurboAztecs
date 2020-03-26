import React from 'react'

export default function Row({ children, size, direction }) {
  const rowStyle = {
    display: 'flex',
    flexDirection: direction === 'row' ? 'row' : 'column',
    flex: size
  }

  return (
    <div style={rowStyle}>
      {children}
    </div>
  )
}
