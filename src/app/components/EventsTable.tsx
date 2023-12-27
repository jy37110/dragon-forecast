'use client';
import { Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { getMoney } from '../util';
import dayjs from 'dayjs';
import { FullEvent } from '../type';
import { ActionType } from './ActionFormModal';

interface EventsTableProps {
  events: FullEvent[];
}

export default function EventsTable({ events }: EventsTableProps) {
  const columns: ColumnsType<FullEvent> = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      responsive: ['sm'],
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '40%',
      render: (text, record) => (
        <div className="flex gap-2">
          <span>{text}</span>
          <div>
            <Tag
              color={record.action === ActionType.topup ? 'success' : 'orange'}
            >
              {record.action}
            </Tag>
          </div>
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => `$${getMoney(text)}`,
      align: 'right',
      sorter: (a, b) => Number(a.amount) - Number(b.amount),
    },
    {
      title: 'category',
      dataIndex: 'category',
      key: 'category',
      sorter: (a, b) =>
        a.category.localeCompare(b.category, undefined, {
          sensitivity: 'base',
        }),
      responsive: ['md'],
    },
    {
      title: 'Date',
      dataIndex: 'create_at',
      key: 'create_at',
      render: (text) => `${dayjs(text).format('YYYY-MM-DD')}`,
      sorter: (a, b) =>
        dayjs(a.create_at).isBefore(dayjs(b.create_at)) ? 0 : 1,
    },
    {
      title: 'Comments',
      dataIndex: 'comments',
      key: 'comments',
      responsive: ['lg'],
    },
  ];
  return (
    <div className="w-full">
      <Table
        size="small"
        columns={columns}
        dataSource={events}
        rowKey={(record) => record.id}
        pagination={false}
      />
    </div>
  );
}
