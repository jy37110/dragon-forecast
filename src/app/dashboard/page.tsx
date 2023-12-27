import React from 'react';
import { NextPage } from 'next';

import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { cookies } from 'next/headers';
import { getForecast } from '../service/getForecast';
import { sumaryForecast } from '../util';

const DashboardPage: NextPage = withPageAuthRequired(
  async () => {
    const cookieStore = cookies();
    const forecasts = await getForecast(cookieStore.toString());

    const [monthlyTopup, totalBalance, initialDebt, shouldHaveBalance] =
      sumaryForecast(forecasts.data);

    return (
      <div className="flex flex-col justify-center items-center h-full w-full gap-y-6 py-6">
        Dashboard
        <p>Top up sum : {monthlyTopup}</p>
        <p>Total balance: {totalBalance}</p>
        <p>Initial debt: {initialDebt}</p>
        <p>
          After transfer the committed forecast amount for current month, you
          should have approximate {shouldHaveBalance}
        </p>
      </div>
    );
  },
  { returnTo: '/login' }
);

export default DashboardPage;
