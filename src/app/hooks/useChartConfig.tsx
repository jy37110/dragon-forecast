import { PieConfig } from '@ant-design/charts';
import { getBarData, getMoney, groupForecastsByCategory } from '../util';
import { Forecast } from '@prisma/client';

export const useChartConfig = (forecasts: Forecast[]) => {
  const pieData = groupForecastsByCategory(forecasts);
  const pieConfig: PieConfig = {
    data: pieData,
    paddingTop: 32,
    angleField: 'forecastSum',
    colorField: 'category',
    radius: 0.8,
    alignX: 'left',
    alignY: 'top',
    label: {
      text: 'category',
      position: 'outside',
      transform: [{ type: 'overlapDodgeY' }],
    },
    tooltip: {
      title: (d) => d.category,
      items: [
        {
          field: 'forecastSum',
          name: 'Sum',
          valueFormatter: (d) => `$${getMoney(d)}`,
        },
        {
          field: 'percentage',
          name: 'Of total',
          valueFormatter: (d) => `${getMoney(d * 100)}%`,
        },
      ],
    },
    legend: {
      color: {
        rowPadding: 6,
        layout: 'grid',
        colPadding: 6,
        position: 'top',
      },
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  };

  const barConfig = {
    data: getBarData(forecasts),
    xField: 'name',
    yField: 'forecast',
    tooltip: {
      title: (d: { name: any }) => d.name,
      items: [
        {
          field: 'forecast',
          name: 'Forecast',
          valueFormatter: (d: string | number | undefined) => `$${getMoney(d)}`,
        },
        {
          field: 'percentage',
          name: 'Of total all',
          valueFormatter: (d: number) => `${getMoney(d * 100)}%`,
        },
      ],
    },
    scrollbar: {
      y: {
        ratio: 0.1,
      },
      x: {
        ratio: 0.5,
      },
    },
    style: {
      maxWidth: 50,
    },
  };

  return {
    pieConfig,
    pieData,
    barConfig,
  };
};
