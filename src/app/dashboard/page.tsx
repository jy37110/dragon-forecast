import Link from 'next/link';
import React from 'react';
import { NextPage } from 'next';

import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const DashboardPage: NextPage = withPageAuthRequired(
  async () => {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <h2>Dashboard</h2>
        <Link href="/">Home</Link>
        <a href="/api/auth/logout">Logout</a>
      </div>
    );
  },
  { returnTo: '/login' }
);

export default DashboardPage;
