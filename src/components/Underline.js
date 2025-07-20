import React from 'react';

export default function Underline({children, color = 'black'}) {
    return (
        <span style={{textDecoration: 'underline', textDecorationColor: color, textDecorationThickness: '3px'}}>
          {children}
        </span>
    );
}