import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { prisma } from '../../../../prisma/prisma';
import { Event } from '@prisma/client';
import dayjs from 'dayjs';

const handleForecastEvent = async (data: Event) => {
  if (data.forecast_id === undefined || data.forecast_id === null) {
    throw new Error('Invalid input');
  }
  const event = {
    action: data.action,
    amount: data.amount,
    forecast_id: data.forecast_id,
    create_at: data.create_at ? new Date(data.create_at) : new Date(),
    user: data.user ?? null,
    comments: data.comments ?? null,
  };

  const forecast = await prisma.forecast.findUnique({
    where: {
      id: event.forecast_id,
    },
  });

  if (!forecast) {
    throw new Error('Forecast not found');
  }

  if (event.action === 'widthdraw' && forecast.balance < event.amount) {
    throw new Error('Insufficient Balance');
  }

  const updatedForecast =
    event.action === 'widthdraw'
      ? {
          ...forecast,
          balance: forecast.balance.minus(event.amount),
          last_widthdraw: event.amount,
          last_widthdraw_at: event.create_at,
          update_at: event.create_at,
        }
      : {
          ...forecast,
          balance: forecast.balance.add(event.amount),
          last_topup: event.amount,
          last_topup_at: event.create_at,
          update_at: event.create_at,
        };
  await prisma.forecast.update({
    where: { id: forecast.id },
    data: updatedForecast,
  });
  const res = await prisma.event.create({ data: event });
  return new Response(JSON.stringify(res), {
    status: 200,
  });
};

const handlePeriodEvent = async (data: Event) => {
  const eventDate = dayjs(
    data.create_at ? new Date(data.create_at) : new Date()
  );
  const periodDate = eventDate.startOf('month').toDate();

  const period = await prisma.period.findFirstOrThrow({
    where: { start: periodDate },
  });

  period.actual_topup_amount = period.actual_topup_amount.add(data.amount);

  const event = {
    action: data.action,
    amount: data.amount,
    create_at: eventDate.toDate(),
    user: data.user ?? null,
    comments: data.comments ?? null,
    period_id: period.id,
  };

  const res = await prisma.event.create({ data: event });
  await prisma.period.update({ where: { id: period.id }, data: period });

  return new Response(JSON.stringify(JSON.stringify(res)), {
    status: 200,
  });
};

const postHandler = async (request: Request) => {
  try {
    const { data } = (await request.json()) as { data: Event };
    if (
      data === undefined ||
      data.action === undefined ||
      data.amount === undefined
    ) {
      throw new Error('Invalid data');
    }
    if (data.action === 'widthdraw' || data.action === 'topup') {
      return await handleForecastEvent(data);
    } else if (data.action === 'deposit') {
      return await handlePeriodEvent(data);
    } else {
      throw new Error('Unknown action');
    }
  } catch (e) {
    console.log(e);
    const error = e as Error;
    return new Response(error.message, { status: 500 });
  }
};

const getHandler = async () => {
  try {
    const events = await prisma.event.findMany({
      include: { forecast: true },
      take: 1000,
      orderBy: { id: 'desc' },
    });

    return new Response(JSON.stringify(events), {
      status: 200,
    });
  } catch (e) {
    console.log(e);
    const error = e as Error;
    return new Response(error.message, { status: 500 });
  }
};

export const POST = withApiAuthRequired(postHandler);
export const GET = withApiAuthRequired(getHandler);
