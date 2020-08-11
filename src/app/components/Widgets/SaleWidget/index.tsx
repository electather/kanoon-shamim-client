import { Typography } from 'antd';
import React from 'react';

import { SaleWidgetWrapper as Wrapper } from './Wrapper';
type Props = {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  description: string;
  color?: string;
};

export const SaleWidget: React.FC<Props> = React.memo(
  ({
    suffix,
    prefix,
    value,
    description,
    label,
    color = 'rgb(247, 93, 129)',
  }) => {
    return (
      <Wrapper>
        <Typography.Title level={3} className="isoSaleLabel">
          {label}
        </Typography.Title>
        <span className="isoSalePrice" style={{ color }}>
          {prefix} {value} {suffix}
        </span>
        <p className="isoSaleDetails">{description}</p>
      </Wrapper>
    );
  },
);
