import Link from 'next/link';
import React from 'react';

export default function BottomNav() {
  return (
    <div className="flex w-full bg-blue-500 text-white justify-around h-[64px] items-center">
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/action">Action</Link>
    </div>
  );
}
