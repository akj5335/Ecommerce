import React from 'react';

const Logo = ({ className }) => (
  <svg className={`logo-svg ${className}`} viewBox="0 0 300 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 10H45C55 10 60 15 60 22C60 29 55 33 48 34C56 35 62 40 62 48C62 56 56 60 45 60H15V10Z" fill="currentColor" />
    <path d="M30 20V30H42C46 30 48 28 48 25C48 22 46 20 42 20H30Z" fill="white" />
    <path d="M30 38V50H44C49 50 51 47 51 44C51 41 49 38 44 38H30Z" fill="white" />
    <text x="75" y="45" fontFamily="var(--font-heading)" fontWeight="900" fontSize="32" letterSpacing="0.1em" fill="currentColor">BÉCANE</text>
    <text x="215" y="45" fontFamily="var(--font-heading)" fontWeight="300" fontSize="14" letterSpacing="0.4em" fill="currentColor">PARIS</text>
  </svg>
);

export default Logo;
