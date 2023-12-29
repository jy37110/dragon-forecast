import { Button, DatePicker, Drawer, Form, Input, InputNumber } from 'antd';
import React, { FocusEventHandler, useEffect, useMemo, useRef } from 'react';
import { useMessager } from '../hooks/useMessager';
import { useUser } from '@auth0/nextjs-auth0/client';
import dayjs from 'dayjs';
import { ActionType } from './ActionFormModal';
import TextArea from 'antd/es/input/TextArea';
import { useMutation } from '@tanstack/react-query';
import { client } from '../service/client';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 18 },
};

interface DepositFormModalProps {
  open: boolean;
  onClose: () => void;
}

export default function DepositFormModal({
  open,
  onClose,
}: DepositFormModalProps) {
  const { user } = useUser();
  const [form] = Form.useForm();
  const formRef = useRef(null);
  const { contextHolder, handleError, handleSuccess } = useMessager();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (event: Event) =>
      await client.post('event', { data: event }),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const initialValues = useMemo(() => {
    return {
      action: ActionType.deposit,
      create_at: dayjs(),
      user: user?.email,
      comments: null,
    };
  }, [user?.email]);

  useEffect(() => {
    if (formRef.current) {
      form.resetFields();
    }
  }, [form, open]);

  const onFinish = async (values: any) => {
    await mutateAsync(values);
    onClose();
  };

  const autoSelect: FocusEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement | null;
    if (target) {
      target.select();
    }
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      placement="bottom"
      closeIcon={null}
      height={'90%'}
      style={{
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
      }}
      contentWrapperStyle={{ paddingLeft: '5%', paddingRight: '5%' }}
    >
      <div className="flex flex-col gap-y-5">
        <h2 className="text-black font-bold">Header</h2>
        <Form
          ref={formRef}
          size="large"
          autoComplete="off"
          onFinish={onFinish}
          form={form}
          className="flex flex-col h-full"
          initialValues={initialValues}
          {...layout}
        >
          <Form.Item hidden name="action" className="mb-3">
            <Input />
          </Form.Item>

          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: 'Please type an amount!' }]}
            className="mb-3"
          >
            <InputNumber
              prefix="$"
              style={{ width: '100%' }}
              autoFocus
              precision={2}
              min={0}
              onFocus={autoSelect}
            />
          </Form.Item>

          <Form.Item label="Date" name="create_at" className="mb-3">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Comments" name="comments" className="mb-3">
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item label="user" hidden name="user" className="mb-3">
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <div className="flex gap-x-4">
              <Button
                type="primary"
                htmlType="submit"
                loading={isPending}
                disabled={isPending}
              >
                Submit
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </div>
          </Form.Item>
        </Form>
        {contextHolder}
      </div>
    </Drawer>
  );
}
