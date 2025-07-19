import React from 'react';

export default function Highlight({children, color, msg=' ', cursor='auto'}) {
  return (
    <span
      style={{
        backgroundColor: color,
        borderRadius: '5px',
        color: '#fff',
        padding: '0.2em',
        cursor: cursor,
      }}
    onClick={() => {
      if (msg!=' ')
      alert(msg)
      }}>
      {children}
    </span>
  );
}