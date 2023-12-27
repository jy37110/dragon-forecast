'use client';
import React, { useState } from 'react';

import { Button } from 'antd';
import { client } from '../service/client';
import { useMutation } from '@tanstack/react-query';
import { useMessager } from '../hooks/useMessager';
import ConfirmModal from './ConfirmModal';

export default function TopupMonthButton() {
  const { contextHolder, handleError, handleSuccess } = useMessager();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async () => await client.patch('topup-month'),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    await mutateAsync();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const confirmModalProps = {
    showModal,
    handleCancel,
    handleOk,
    title: 'Danger Action',
    isModalOpen,
    isPending,
  };

  return (
    <>
      {contextHolder}
      <Button
        danger
        onClick={showModal}
        disabled={isPending}
        type="primary"
        block
        size="large"
        style={{ borderRadius: 0 }}
      >
        Topup the Month
      </Button>
      <ConfirmModal {...confirmModalProps}>
        <>
          <p>
            You are going to top up the month which will change all records in
            the table. This action can not be reverted.
          </p>
          <p>Continue?</p>
        </>
      </ConfirmModal>
    </>
  );
}
