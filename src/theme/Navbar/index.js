import React from 'react';
import NavbarLayout from '@theme/Navbar/Layout';
import NavbarContent from '@theme/Navbar/Content';
import NavCatSprite from '@site/src/components/NavCatSprite';
export default function Navbar() {
  return (
    <NavbarLayout>
      <NavbarContent />
      <NavCatSprite />
    </NavbarLayout>
  );
}