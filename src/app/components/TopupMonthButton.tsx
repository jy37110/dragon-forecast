'use client';
import React from 'react';

import { Button } from '@nextui-org/react';
import { client } from '../service/client';

export default function TopupMonthButton() {
  const handleTopupMonthClick = async () => {
    const res = await client.patch('topup', { any: 'data' });
    console.log(res);
  };

  return (
    <Button color="warning" fullWidth={true} onPress={handleTopupMonthClick}>
      Topup the Month
    </Button>
  );
}
