import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { prisma } from '../../../../prisma/prisma';
import dayjs from 'dayjs';

const getHandler = async () => {
  try {
    const currentPeriod = dayjs().startOf('month');
    const period = await prisma.period.findFirst({
      where: { start: currentPeriod.toDate() },
    });

    return new Response(JSON.stringify(period), {
      status: 200,
    });
  } catch (e) {
    console.log(e);
    const error = e as Error;
    return new Response(error.message, { status: 500 });
  }
};

export const GET = withApiAuthRequired(getHandler);
