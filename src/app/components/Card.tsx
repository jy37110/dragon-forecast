import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
}

export default function Card({ children }: CardProps) {
  return (
    <div className="px-5 mb-5">
      <div className="bg-white text-black rounded-[16px] shadow-2xl">
        {children}
      </div>
    </div>
  );
}
