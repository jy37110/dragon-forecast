import { Forecast, Event } from '@prisma/client';
import { client } from './client';
import { AxiosResponse } from 'axios';

export const getEvents = async (
  cookie: string
): Promise<AxiosResponse<Event & { forecast: Forecast }[]>> => {
  return await client.get('event', {
    headers: { Cookie: cookie },
  });
};
