import React from 'react';

export default function Underline({children, color = 'black'}) {
    return (
        <span style={{textDecoration: 'underline', textDecorationColor: color}}>
          {children}
        </span>
    );
}