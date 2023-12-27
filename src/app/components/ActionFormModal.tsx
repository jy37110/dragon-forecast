'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Radio,
  Space,
} from 'antd';
import { Forecast } from '@prisma/client';
import dayjs from 'dayjs';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useMutation } from '@tanstack/react-query';
import { client } from '../service/client';
import { useMessager } from '../hooks/useMessager';

interface ActionFormProps {
  forecast: Forecast | undefined;
  open: boolean;
  onClose: () => void;
}

export enum ActionType {
  widthdraw = 'widthdraw',
  topup = 'topup',
}

const { TextArea } = Input;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 18 },
};

export default function ActionFormModal({
  forecast,
  open,
  onClose,
}: ActionFormProps) {
  const [form] = Form.useForm();
  const { user } = useUser();
  const formRef = useRef(null);
  const { contextHolder, handleError, handleSuccess } = useMessager();

  const { isPending, mutate } = useMutation({
    mutationFn: async (event: Event) =>
      await client.post('event', { data: event }),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const initialValues = useMemo(() => {
    return {
      action: ActionType.widthdraw,
      create_at: dayjs(),
      user: user?.email,
      forecast_id: forecast?.id,
    };
  }, [forecast?.id, user?.email]);

  useEffect(() => {
    if (formRef.current) {
      form.resetFields();
    }
  }, [forecast, form]);

  const onFinish = (values: any) => {
    mutate(values);
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
        <h2 className="text-black font-bold">
          #{forecast?.id} - {forecast?.name}
        </h2>
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
          <Form.Item hidden name="forecast_id" className="mb-3">
            <Input />
          </Form.Item>

          <Form.Item
            label="Action Type"
            name="action"
            rules={[{ required: true, message: 'Please select an action!' }]}
            className="mb-3"
          >
            <Radio.Group value={ActionType.widthdraw}>
              <Radio value={ActionType.widthdraw}>Widthdraw</Radio>
              <Radio value={ActionType.topup}>Top Up</Radio>
            </Radio.Group>
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
