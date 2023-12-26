'use client';
import React from 'react';

import { Button } from 'antd';
import { client } from '../service/client';
import { useMutation } from '@tanstack/react-query';
import { useMessager } from '../hooks/useMessager';

export default function TopupMonthButton() {
  const { contextHolder, handleError, handleSuccess } = useMessager();

  const { isPending, mutate } = useMutation({
    mutationFn: async () => await client.patch('topup-month'),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  return (
    <>
      {contextHolder}
      <Button
        danger
        onClick={() => mutate()}
        loading={isPending}
        disabled={isPending}
        type="primary"
        block
        size="large"
      >
        Topup the Month
      </Button>
    </>
  );
}
