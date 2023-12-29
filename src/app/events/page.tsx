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

    return (
      <div className="flex flex-col justify-center items-center h-full w-full gap-y-6 py-6">
        <EventsTable events={eventsView} />
      </div>
    );
  },
  { returnTo: '/api/auth/login' }
);

export default EventsPage;
