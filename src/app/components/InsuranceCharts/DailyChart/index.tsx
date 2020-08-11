import { Typography } from 'antd';
import React, { useMemo } from 'react';
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';
import { StatDetailsDto } from 'userResponse';
import { formatDate, formatMoney } from 'utils';

import { ChartsWrapper as Wrapper } from './Wrapper';

type Props = {
  data?: StatDetailsDto[];
  width?: number;
  height?: number;
  title?: string;
  id: string;
  loading?: boolean;
  ref?: React.MutableRefObject<undefined>;
};

const CustomTooltip: any = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`میانگین ارزش در تاریخ ${label} : ${formatMoney(
          payload?.[0]?.value,
        )}`}</p>
        <p className="label">{`میانگین کمیسیون در تاریخ ${label} : ${formatMoney(
          payload?.[1]?.value,
        )}`}</p>
      </div>
    );
  }

  return null;
};

const CustomTooltipAlt: any = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`تعداد بیمه های ثبت شده در تاریخ${label} : ${payload?.[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export const DailyChart: React.FC<Props> = React.memo(
  React.forwardRef(({ data = [], width, height, title, id }, ref) => {
    const usableData = useMemo(
      () =>
        data.map(item => ({
          date: formatDate(item.date, 'D/M'),
          totalValue: item.totalValue,
          commission: item.commission,
          avgValue: item.avgValue,
          avgCommission: item.avgCommission,
          count: item.count,
        })),
      [data],
    );

    return (
      <Wrapper hasTitle={!!title} ref={ref as any}>
        {title && <Typography.Title level={4}>{title}</Typography.Title>}
        <ResponsiveContainer width={width} height={height}>
          <LineChart
            data={usableData}
            syncId={id}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="date" />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="avgValue"
              strokeOpacity={1}
              stroke="#2980b9"
              name="ارزش کلی"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="avgCommission"
              strokeOpacity={1}
              stroke="#27ae60"
              name="کمیسیون"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer width={width} height={height}>
          <BarChart
            data={usableData}
            syncId={id}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="date" />
            <Tooltip content={<CustomTooltipAlt />} />
            <Bar dataKey="count" name="بیمه های ثبت شده" fill="#7f8c8d" />
          </BarChart>
        </ResponsiveContainer>
      </Wrapper>
    );
  }),
);
