import { Typography } from 'antd';
import {
  ProgressBar,
  ProgressBarProps,
} from 'app/components/uiElements/Progress/SingleProgressBar';
import React from 'react';

import { ReportWidgetWrapper as Wrapper } from './Wrapper';

type Props = {
  label: string;
  data: ProgressBarProps[];
  details: string;
};

export const ReportWidget: React.FC<Props> = React.memo(
  ({ label, data, details }) => {
    return (
      <Wrapper>
        <Typography.Title level={3} className="isoWidgetLabel">
          {label}
        </Typography.Title>

        <div className="isoReportsWidgetBar">
          {data.map((val, index) => (
            <ProgressBar {...val} key={index} />
          ))}
        </div>

        <p className="isoDescription">{details}</p>
      </Wrapper>
    );
  },
);
