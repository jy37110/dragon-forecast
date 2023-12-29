'use client';
import { Button } from 'antd';
import React, { useState } from 'react';
import DepositFormModal from './DepositFormModal';

export default function DepositButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        onClick={showModal}
        block
        size="large"
        type="primary"
        style={{ borderRadius: 0 }}
      >
        Deposit
      </Button>
      <DepositFormModal open={isModalOpen} onClose={onClose} />
    </>
  );
}
