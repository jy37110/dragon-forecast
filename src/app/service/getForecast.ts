import { Forecast } from '@prisma/client';
import { client } from './client';
import { AxiosResponse } from 'axios';

export const getForecast = async (
  cookie: string
): Promise<AxiosResponse<Forecast[]>> => {
  return await client.get('forecast', {
    headers: { Cookie: cookie },
  });
};
