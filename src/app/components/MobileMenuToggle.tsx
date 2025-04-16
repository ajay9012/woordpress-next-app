'use client';
import { useState } from 'react';

export default function MobileMenuToggle() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    const menu = document.querySelector('.mobile-menu');
    menu?.classList.toggle('hidden');
    setIsOpen(!isOpen);
  };

  return (
    <button onClick={toggleMenu} className="mobile-menu-button outline-none">
      <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" 
          strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
      </svg>
    </button>
  );
}