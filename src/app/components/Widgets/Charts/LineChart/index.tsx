import { Typography } from 'antd';
import React from 'react';
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { ChartsWrapper as Wrapper } from './Wrapper';

type Props = {
  data: { name: string; data: number }[];
  width?: number;
  height?: number;
  title?: string;
};

export const LineChartWidget: React.FC<Props> = React.memo(
  ({ data, width, height, title }) => {
    return (
      <Wrapper width={width} height={height} hasTitle={!!title}>
        {title && <Typography.Title level={4}>{title}</Typography.Title>}
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="data"
              strokeOpacity={1}
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Wrapper>
    );
  },
);
