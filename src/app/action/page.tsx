import React from 'react';
import { NextPage } from 'next';
import { cookies } from 'next/headers';

import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import TopupMonthButton from '../components/TopupMonthButton';
import { getForecast } from '../service/getForecast';
import ForecastTable from '../components/ForecastTable';
import DepositButton from '../components/DepositButton';

const ActionPage: NextPage = withPageAuthRequired(
  async () => {
    const cookieStore = cookies();
    const forecasts = await getForecast(cookieStore.toString());

    return (
      <div className="flex flex-col justify-center items-center h-full w-full gap-y-6 py-6">
        <ForecastTable forecasts={forecasts.data} />
        <DepositButton />
        <TopupMonthButton />
      </div>
    );
  },
  { returnTo: '/api/auth/login' }
);

export default ActionPage;
