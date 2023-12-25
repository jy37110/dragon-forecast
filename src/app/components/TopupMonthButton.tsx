'use client';
import React from 'react';

import { Button, message } from 'antd';
import { client } from '../service/client';
import { useMutation } from '@tanstack/react-query';

export default function TopupMonthButton() {
  const [messageApi, contextHolder] = message.useMessage();

  const handleSuccess = () => {
    messageApi.open({
      type: 'success',
      content: 'Success!',
    });
  };
  const handleError = () => {
    messageApi.open({
      type: 'error',
      content: 'Something went wrong',
    });
  };

  const { isPending, mutate } = useMutation({
    mutationFn: async () => await client.patch('topup-month'),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  return (
    <>
      {contextHolder}
      <Button
        color="warning"
        onClick={() => mutate()}
        loading={isPending}
        block
      >
        Topup the Month
      </Button>
    </>
  );
}
