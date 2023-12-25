import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { prisma } from '../../../../prisma/prisma';

const patchHandler = async () => {
  try {
    const session = await getSession();
    const user = session?.user;
    const forecasts = await prisma.forecast.findMany();
    if (forecasts && user) {
      const events = forecasts.map((forecast) => {
        return {
          action: 'topup',
          amount: forecast.forecast,
          create_at: new Date(),
          user: user.name,
          comments: null,
          forecast_id: forecast.id,
        };
      });

      await prisma.event.createMany({ data: events });

      forecasts.forEach(async (forecast) => {
        const updatedForecast = {
          ...forecast,
          balance: forecast.balance.add(forecast.forecast),
          last_topup: forecast.forecast,
          last_topup_at: new Date(),
          update_at: new Date(),
        };

        await prisma.forecast.update({
          where: {
            id: updatedForecast.id,
          },
          data: updatedForecast,
        });
      });
    }
    return new Response('Topup success', {
      status: 200,
    });
  } catch (e) {
    console.log(e);
    const error = e as Error;
    return new Response(error.message, { status: 500 });
  }
};

export const PATCH = withApiAuthRequired(patchHandler);
