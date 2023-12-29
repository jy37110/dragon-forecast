import { Period } from '@prisma/client';
import { client } from './client';
import { AxiosResponse } from 'axios';

export const getPeriod = async (
  cookie: string
): Promise<AxiosResponse<Period>> => {
  return await client.get('period', {
    headers: { Cookie: cookie },
  });
};
