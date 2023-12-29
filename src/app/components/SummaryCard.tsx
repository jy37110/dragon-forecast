import { Forecast, Period } from '@prisma/client';
import React, { useCallback } from 'react';
import Card from './Card';
import { getMoney, getPeriodState, sumaryForecast } from '../util';
import dayjs from 'dayjs';
import { FileDoneOutlined, ProfileOutlined } from '@ant-design/icons';

interface SummaryCardProps {
  forecasts: Forecast[];
  period?: Period | null;
}

export default function SummaryCard({ forecasts, period }: SummaryCardProps) {
  const [monthlyTopup, totalBalance, initialDebt, shouldHaveBalance] =
    sumaryForecast(forecasts);
  const periodState = getPeriodState(period);
  const renderPeriodState = useCallback(() => {
    if (period === null || period === undefined)
      return <p className="row-span-full text-yellow-600">Period not found</p>;
    if (periodState === 0) {
      return (
        <p className="row-span-full text-green-700">
          <FileDoneOutlined /> Great job! You have completed committed forecast
          deposit
        </p>
      );
    } else if (periodState < 0) {
      return (
        <p className="row-span-full text-green-700">
          <FileDoneOutlined /> Great job! You have over deposited committed
          forecast by <b>${getMoney(Math.abs(periodState))}</b>
        </p>
      );
    } else {
      return (
        <p className="row-span-full text-red-600">
          <ProfileOutlined /> Action Required! You have{' '}
          <b>${getMoney(periodState)}</b> to deposit
        </p>
      );
    }
  }, [periodState, period]);

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
        {renderPeriodState()}
        <p className="row-span-full">
          After transfer the committed forecast amount for current month, you
          should have approximate <b>${getMoney(shouldHaveBalance)}</b>
        </p>
      </div>
    </Card>
  );
}
