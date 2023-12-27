import { Forecast } from '@prisma/client';
import React from 'react';
import Card from './Card';
import { getMoney, sumaryForecast } from '../util';
import dayjs from 'dayjs';

interface SummaryCardProps {
  forecasts: Forecast[];
}

export default function SummaryCard({ forecasts }: SummaryCardProps) {
  const [monthlyTopup, totalBalance, initialDebt, shouldHaveBalance] =
    sumaryForecast(forecasts);

  return (
    <Card>
      <div className="p-5 flex flex-col gap-y-5 text-gray-700">
        <h3>{dayjs().format('LL')}</h3>
        <div className="grid grid-cols-[max-content_1fr] justify-items-end gap-y-1">
          <p>Monthly Top Up: </p>
          <b>${getMoney(monthlyTopup)}</b>
          <p>Total Balance: </p>
          <b>${getMoney(totalBalance)}</b>
          <p>Initial Debt:</p>
          <b>${getMoney(initialDebt)}</b>
        </div>
        <p className="row-span-full">
          After transfer the committed forecast amount for current month, you
          should have approximate <b>${getMoney(shouldHaveBalance)}</b>
        </p>
      </div>
    </Card>
  );
}
