'use client';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import {
  CalculatorFilled,
  CalculatorOutlined,
  CodeFilled,
  CodeOutlined,
  DashboardFilled,
  DashboardOutlined,
} from '@ant-design/icons';

const navItems = [
  {
    key: '/dashboard',
    render: (isActive: boolean) => {
      return (
        <Link
          href="/dashboard"
          className="text-white no-underline"
          key="/dashboard"
        >
          <div className="flex flex-col gap-y-[6px] items-center justify-center">
            {isActive ? (
              <DashboardFilled className="text-[24px]" />
            ) : (
              <DashboardOutlined className="text-[24px]" />
            )}
            <span className={`text-xs ${isActive && 'font-bold'}`}>
              Dashboard
            </span>
          </div>
        </Link>
      );
    },
  },
  {
    key: '/action',
    render: (isActive: boolean) => {
      return (
        <Link href="/action" className="text-white no-underline" key="/action">
          <div className="flex flex-col gap-y-[6px] items-center justify-center">
            {isActive ? (
              <CalculatorFilled className="text-[24px]" />
            ) : (
              <CalculatorOutlined className="text-[24px]" />
            )}
            <span className={`text-xs ${isActive && 'font-bold'}`}>
              Forecast
            </span>
          </div>
        </Link>
      );
    },
  },
  {
    key: '/events',
    render: (isActive: boolean) => {
      return (
        <Link href="/events" className="text-white no-underline" key="/events">
          <div className="flex flex-col gap-y-[4px] items-center justify-center">
            {isActive ? (
              <CodeFilled className="text-[24px]" />
            ) : (
              <CodeOutlined className="text-[24px]" />
            )}
            <span className={`text-xs ${isActive && 'font-bold'}`}>Events</span>
          </div>
        </Link>
      );
    },
  },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <div className="flex w-full bg-blue-900 justify-around h-[92px] items-center fixed bottom-0 left-0 pb-[12px]">
      {navItems.map((item) => {
        return item.render(item.key === pathname);
      })}
    </div>
  );
}
