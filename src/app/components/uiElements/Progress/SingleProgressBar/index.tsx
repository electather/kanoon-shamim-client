import { Progress } from 'antd';
import React from 'react';

import { ProgressBarWrapper as Wrapper } from './Wrapper';

export type ProgressBarProps = {
  label: string;
  percent: number;
  strokeWidth?: number;
  status?: 'normal' | 'exception' | 'active' | 'success';
  showInfo?: boolean;
};

export const ProgressBar: React.FC<ProgressBarProps> = React.memo(
  ({ label, percent, strokeWidth = 7, status, showInfo = true }) => {
    return (
      <Wrapper>
        <h3>{label}</h3>
        <Progress
          percent={percent}
          strokeWidth={strokeWidth}
          status={status}
          showInfo={showInfo}
        />
      </Wrapper>
    );
  },
);
