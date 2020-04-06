import React from 'react'

export default function Row({ children, size, itemsDirection }) {
  const rowStyle = {
    display: 'flex',
    flexDirection: itemsDirection === 'row' ? 'row' : 'column',
    flex: size
  }

  return (
    <div style={rowStyle}>
      {children}
    </div>
  )
}
