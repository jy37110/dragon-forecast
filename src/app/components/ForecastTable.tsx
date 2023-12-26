'use client';
import { Forecast } from '@prisma/client';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import { getMoney } from '../util';
import ActionFormModal from './ActionFormModal';

interface ForecastTableProps {
  forecasts: Forecast[];
}

export default function ForecastTable({ forecasts }: ForecastTableProps) {
  const [selectedRow, setSelectedRow] = useState<Forecast | undefined>();

  const closeModal = () => {
    setSelectedRow(undefined);
  };

  const columns: ColumnsType<Forecast> = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      responsive: ['sm'],
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
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
      title: 'balance',
      dataIndex: 'balance',
      key: 'balance',
      render: (text) => `$${getMoney(text)}`,
      align: 'right',
      sorter: (a, b) => Number(a.balance) - Number(b.balance),
    },
    {
      title: 'forecast',
      dataIndex: 'forecast',
      key: 'forecast',
      render: (text) => `$${getMoney(text)}`,
      align: 'right',
      sorter: (a, b) => Number(a.forecast) - Number(b.forecast),
    },
  ];
  return (
    <div className="w-full">
      <Table
        style={{ borderRadius: '10px' }}
        columns={columns}
        dataSource={forecasts}
        rowKey={(record) => record.id}
        pagination={false}
        onRow={(record) => {
          return {
            onClick: (event) => {
              setSelectedRow(record);
            },
          };
        }}
      />
      <ActionFormModal
        onClose={closeModal}
        forecast={selectedRow}
        open={selectedRow !== undefined}
      />
    </div>
  );
}
