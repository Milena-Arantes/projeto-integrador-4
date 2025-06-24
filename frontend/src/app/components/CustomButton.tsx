'use client';

import React from 'react';

interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'third';
  type?: 'button' | 'submit' | 'reset';
}

const baseClasses = 'font-semibold py-3 rounded-2xl transition text-white ';

const variants = {
  primary: 'bg-blue-400 hover:bg-blue-500 w-full',
  secondary: 'bg-gray-400 hover:bg-gray-500 w-full',
  third: 'bg-blue-400 hover:bg-blue-500 px-6 py-3',
};

export default function CustomButton({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
}: CustomButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}