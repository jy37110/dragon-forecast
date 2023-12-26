import React from 'react';
import { NextPage } from 'next';
import { cookies } from 'next/headers';

import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { getEvents } from '../service/getEvents';
import EventsTable from '../components/EventsTable';
import { formatFullEvent } from '../util';

const EventsPage: NextPage = withPageAuthRequired(
  async () => {
    const cookieStore = cookies();
    const events = await getEvents(cookieStore.toString());
    const eventsView = formatFullEvent(events.data);
    console.log(eventsView);

    return (
      <div className="flex flex-col justify-center items-center h-full w-full p-[24px] max-sm:p-[0px] gap-y-5">
        <EventsTable events={eventsView} />
      </div>
    );
  },
  { returnTo: '/login' }
);

export default EventsPage;
