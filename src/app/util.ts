import { Forecast, Event, Period } from '@prisma/client';
import { FullEvent, GroupedForecast } from './type';

const INITIAL_DEBT_FIX = 6000 - 136 - 160 - 500;

const APP_RELEASE_DISCREPANCY = 835.94; //Last event record: Kelly Club	withdraw	60	2023-12-13T00:00:00.000Z

export const getMoney = (value: number | string | undefined): string => {
  if (value === undefined) {
    return '';
  }
  const numericValue: number =
    typeof value === 'string' ? parseFloat(value) : value;

  if (!isNaN(numericValue)) {
    const formattedValue = numericValue.toFixed(2);
    return formattedValue;
  } else {
    return '';
  }
};

export const formatFullEvent = (
  events: Event & { forecast: Forecast }[]
): FullEvent[] => {
  return events.map((event) => {
    return { ...event.forecast, ...event } as FullEvent;
  });
};

function sumByKey<T extends Forecast>(array: T[], key: keyof T): number {
  return array.reduce((acc, obj) => acc + Number(obj[key]), 0);
}

export const getMonthlyTopUp = (forecasts: Forecast[]): number => {
  return sumByKey(forecasts, 'forecast');
};

const getTotalBalance = (forecasts: Forecast[]): number => {
  return sumByKey(forecasts, 'balance');
};

const getInitialDebt = (forecasts: Forecast[]): number => {
  return sumByKey(forecasts, 'debt');
};

const getInitialActialDebt = (forecasts: Forecast[]): number => {
  return getInitialDebt(forecasts) - INITIAL_DEBT_FIX;
};

const getShouldHaveBalance = (forecasts: Forecast[]): number => {
  return (
    getTotalBalance(forecasts) -
    getInitialActialDebt(forecasts) -
    APP_RELEASE_DISCREPANCY
  );
};

export const sumaryForecast = (forecasts: Forecast[]): number[] => {
  return [
    getMonthlyTopUp(forecasts),
    getTotalBalance(forecasts),
    getInitialActialDebt(forecasts),
    getShouldHaveBalance(forecasts),
  ];
};

export const getPeriodState = (period: Period | undefined | null): number => {
  if (period === null || period === undefined) return 0;
  return Number(
    Number(period.committed_topup_amount) - Number(period.actual_topup_amount)
  );
};

export function groupForecastsByCategory(
  forecasts: Forecast[]
): GroupedForecast[] {
  const groupedForecasts: { [category: string]: Forecast[] } = {};
  const total = sumByKey(forecasts, 'forecast');

  forecasts.forEach((forecast) => {
    const { category } = forecast;
    if (!groupedForecasts[category]) {
      groupedForecasts[category] = [];
    }
    groupedForecasts[category].push(forecast);
  });

  const result = Object.entries(groupedForecasts).map(
    ([category, forecasts]) => ({
      category,
      forecasts,
      forecastSum: sumByKey(forecasts, 'forecast'),
      percentage: sumByKey(forecasts, 'forecast') / total,
    })
  );

  return result;
}

export function getBarData(forecasts: Forecast[]) {
  const total = sumByKey(forecasts, 'forecast');
  return forecasts
    .map((forecast) => {
      return {
        ...forecast,
        forecast: Number(forecast.forecast),
        percentage: Number(forecast.forecast) / total,
      };
    })
    .sort((a, b) => b.forecast - a.forecast);
}
