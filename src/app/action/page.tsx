import React from 'react';
import { NextPage } from 'next';

import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import TopupMonthButton from '../components/TopupMonthButton';

const ActionPage: NextPage = withPageAuthRequired(
  async () => {
    return (
      <div className="flex flex-col justify-center items-center h-full w-full p-[32px]">
        <h2>Action page</h2>
        <TopupMonthButton />
      </div>
    );
  },
  { returnTo: '/login' }
);

export default ActionPage;
