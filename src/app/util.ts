import { Forecast, Event } from '@prisma/client';
import { FullEvent } from './type';

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
