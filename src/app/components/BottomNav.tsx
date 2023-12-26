import Link from 'next/link';
import React from 'react';

export default function BottomNav() {
  return (
    <div className="flex w-full bg-blue-500 text-white justify-around h-[64px] items-center fixed bottom-0 left-0">
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/action">Forecast</Link>
      <Link href="/events">Events</Link>
    </div>
  );
}
