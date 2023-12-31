import React from 'react';
import { NextPage } from 'next';

import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { cookies } from 'next/headers';
import { getForecast } from '../service/getForecast';
import SummaryCard from '../components/SummaryCard';
import { getPeriod } from '../service/getPeriod';
import SepensesSummaryCard from '../components/SpensesSummaryCard';

const DashboardPage: NextPage = withPageAuthRequired(
  async () => {
    const cookieStore = cookies();
    const forecasts = await getForecast(cookieStore.toString());
    const period = await getPeriod(cookieStore.toString());

    return (
      <div className="h-full w-full gap-y-6 py-6 flex flex-col">
        {forecasts && period && (
          <SummaryCard forecasts={forecasts.data} period={period.data} />
        )}
        {forecasts && <SepensesSummaryCard forecasts={forecasts.data} />}
      </div>
    );
  },
  { returnTo: '/api/auth/login' }
);

export default DashboardPage;
