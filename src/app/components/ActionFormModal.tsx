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

enum ActionType {
  widthdraw = 'widthdraw',
  topup = 'topup',
}

const { TextArea } = Input;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
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
          className="flex flex-col gap-y-2 h-full"
          initialValues={initialValues}
          {...layout}
        >
          <Form.Item hidden name="forecast_id">
            <Input />
          </Form.Item>

          <Form.Item
            label="Action Type"
            name="action"
            rules={[{ required: true, message: 'Please select an action!' }]}
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
          >
            <InputNumber
              prefix="$"
              style={{ width: '100%' }}
              autoFocus
              precision={2}
            />
          </Form.Item>

          <Form.Item label="Date" name="create_at">
            <DatePicker />
          </Form.Item>

          <Form.Item label="Comments" name="comments">
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item label="user" hidden name="user">
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button htmlType="submit" loading={isPending} disabled={isPending}>
              Submit
            </Button>
          </Form.Item>
        </Form>
        {contextHolder}
      </div>
    </Drawer>
  );
}
