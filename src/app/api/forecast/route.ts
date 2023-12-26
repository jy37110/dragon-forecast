import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { prisma } from '../../../../prisma/prisma';

const getHandler = async () => {
  try {
    const forecasts = await prisma.forecast.findMany();
    return new Response(JSON.stringify(forecasts), {});
  } catch (e) {
    console.log(e);
    const error = e as Error;
    return new Response(error.message, { status: 500 });
  }
};

export const GET = withApiAuthRequired(getHandler);
