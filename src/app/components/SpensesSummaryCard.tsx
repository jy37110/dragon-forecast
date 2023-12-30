'use client';
import React from 'react';
import Card from './Card';
import { Tabs } from 'antd';
import { Forecast } from '@prisma/client';
import dynamic from 'next/dynamic';
import { useChartConfig } from '../hooks/useChartConfig';

const Pie = dynamic(() => import('@ant-design/plots').then((mod) => mod.Pie), {
  ssr: false,
});

const Bar = dynamic(() => import('@ant-design/plots').then((mod) => mod.Bar), {
  ssr: false,
});

interface SpensesSummaryCardProps {
  forecasts: Forecast[];
}

export default function SepensesSummaryCard({
  forecasts,
}: SpensesSummaryCardProps) {
  const { pieConfig, barConfig } = useChartConfig(forecasts);

  const tabItems = [
    {
      label: 'Pie',
      key: 'pie',
      children: (
        <div className="w-full pt-[8px]">
          <h3 className="px-4">Main Spenses</h3>
          <Pie {...pieConfig} />
        </div>
      ),
    },
    {
      label: 'Bar',
      key: 'bar',
      children: (
        <div className="w-full pt-[8px]">
          <h3 className="px-4">Main Spenses</h3>
          <Bar {...barConfig} />
        </div>
      ),
    },
  ];
  return (
    <Card>
      <div className="py-5">
        <Tabs defaultActiveKey="1" centered items={tabItems} />
      </div>
    </Card>
  );
}
