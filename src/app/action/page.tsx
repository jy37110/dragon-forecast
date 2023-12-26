import React from 'react';
import { NextPage } from 'next';
import { cookies } from 'next/headers';

import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import TopupMonthButton from '../components/TopupMonthButton';
import { getForecast } from '../service/getForecast';
import ForecastTable from '../components/ForecastTable';

const ActionPage: NextPage = withPageAuthRequired(
  async () => {
    const cookieStore = cookies();
    const forecasts = await getForecast(cookieStore.toString());

    return (
      <div className="flex flex-col justify-center items-center h-full w-full p-[32px] gap-y-5">
        <ForecastTable forecasts={forecasts.data} />
        <TopupMonthButton />
      </div>
    );
  },
  { returnTo: '/login' }
);

export default ActionPage;
