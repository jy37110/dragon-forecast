import React, { ReactNode } from 'react';
import { Modal } from 'antd';

interface ConfirmModalProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  title: string;
  children: ReactNode;
  isPending: boolean;
}

export default function ConfirmModal({
  isModalOpen,
  handleCancel,
  handleOk,
  title,
  isPending,
  children,
}: ConfirmModalProps) {
  return (
    <Modal
      okButtonProps={{ danger: true }}
      confirmLoading={isPending}
      title={title}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {children}
    </Modal>
  );
}
