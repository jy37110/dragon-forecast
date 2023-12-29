import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { prisma } from '../../../../prisma/prisma';
import dayjs from 'dayjs';
import { getMonthlyTopUp } from '@/app/util';
import { Decimal } from '@prisma/client/runtime/library';
import { Period } from '@prisma/client';

const patchHandler = async () => {
  try {
    const session = await getSession();
    const user = session?.user;
    const forecasts = await prisma.forecast.findMany();

    const now = dayjs();
    const currentDate = now.date();
    const updateDate =
      currentDate >= 15
        ? now.startOf('month').add(1, 'month').toDate()
        : now.startOf('month').toDate();

    if (forecasts && user) {
      const events = forecasts.map((forecast) => {
        return {
          action: 'topup',
          amount: forecast.forecast,
          create_at: updateDate,
          user: user.name,
          comments: null,
          forecast_id: forecast.id,
        };
      });

      const period = {
        start: updateDate,
        committed_topup_amount: new Decimal(getMonthlyTopUp(forecasts)),
        actual_topup_amount: new Decimal(0),
      };

      await prisma.period.create({ data: period });

      await prisma.event.createMany({ data: events });

      await Promise.all(
        forecasts.map(async (forecast) => {
          const updatedForecast = {
            ...forecast,
            balance: forecast.balance.add(forecast.forecast),
            last_topup: forecast.forecast,
            last_topup_at: updateDate,
            update_at: updateDate,
          };

          await prisma.forecast.update({
            where: {
              id: updatedForecast.id,
            },
            data: updatedForecast,
          });
        })
      );
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
