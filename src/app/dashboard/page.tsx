import React from 'react';
import { NextPage } from 'next';

import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { cookies } from 'next/headers';
import { getForecast } from '../service/getForecast';
import { sumaryForecast } from '../util';
import SummaryCard from '../components/SummaryCard';

const DashboardPage: NextPage = withPageAuthRequired(
  async () => {
    const cookieStore = cookies();
    const forecasts = await getForecast(cookieStore.toString());

    return (
      <div className="h-full w-full gap-y-6 py-6 ">
        <SummaryCard forecasts={forecasts.data} />
      </div>
    );
  },
  { returnTo: '/login' }
);

export default DashboardPage;
