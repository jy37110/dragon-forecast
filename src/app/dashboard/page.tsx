import Link from 'next/link';
import React from 'react';
import { NextPage } from 'next';

import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';

const DashboardPage: NextPage = withPageAuthRequired(
  async () => {
    const session = await getSession();
    console.log(session);

    return (
      <div>
        <h2>Dashboard</h2>
        <Link href="/">Home</Link>
        <a href="/api/auth/logout">Logout</a>
      </div>
    );
  },
  { returnTo: '/login' }
);

export default DashboardPage;
