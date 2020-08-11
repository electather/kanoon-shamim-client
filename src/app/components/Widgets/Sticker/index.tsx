import React from 'react';

import { StickerWidgetWrapper as Wrapper } from './Wrapper';

type Props = {
  fontColor: string;
  backgroundColor: string;
  width?: number;
  icon: React.ReactNode;
  value: number | string;
  description: string;
};

export const Sticker: React.FC<Props> = React.memo(
  ({ fontColor, backgroundColor, width, icon, value, description }) => {
    return (
      <Wrapper
        backgroundColor={backgroundColor}
        width={width}
        fontColor={fontColor}
      >
        <div className="isoIconWrapper">{icon}</div>
        <div className="isoContentWrapper">
          <h3 className="isoStatNumber">{value}</h3>
          <span className="isoLabel">{description}</span>
        </div>
      </Wrapper>
    );
  },
);
