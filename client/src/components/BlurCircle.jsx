import React from 'react'

const BlurCircle = ({ top = 'auto', bottom = 'auto', left = 'auto', right = 'auto', size =150, color = 'rgba(248, 69, 101, 0.4)' }) => {
  return (
    <div
      className="absolute rounded-full blur-3xl z-0 pointer-events-none"
      style={{
        top,
        bottom,
        left,
        right,
        width: size,
        height: size,
        backgroundColor: color,
      }}
    ></div>
  )
}

export default BlurCircle
