import { Forecast, Event } from '@prisma/client';
import { FullEvent } from './type';

const INITIAL_DEBT_FIX = 6000 - 136 - 160 - 500;
const APP_RELEASE_DISCREPANCY = 835.94;

interface GroupedForecast {
  value: string;
  title: string;
  children: {
    value: number;
    title: string;
    obj: Forecast;
  }[];
}

export const groupForecastsByCategory = (
  forecasts: Forecast[]
): GroupedForecast[] => {
  const groupedForecasts: Record<string, GroupedForecast> = {};

  forecasts.forEach((forecast) => {
    const { id, name, category } = forecast;

    if (!groupedForecasts[category]) {
      groupedForecasts[category] = {
        value: category,
        title: category,
        children: [],
      };
    }

    groupedForecasts[category].children.push({
      value: id,
      title: name,
      obj: forecast,
    });
  });

  return Object.values(groupedForecasts);
};

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

const getMonthlyTopUp = (forecasts: Forecast[]): number => {
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
