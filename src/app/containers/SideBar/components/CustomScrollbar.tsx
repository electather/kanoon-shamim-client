import React from 'react';
import { Scrollbar } from 'react-scrollbars-custom';

export const CustomScrollBar: React.FC<{
  id?: string;
  style: React.CSSProperties;
  className?: string;
}> = ({ id, style, children, className }) => (
  <Scrollbar
    id={id}
    className={className}
    style={style}
    momentum={true}
    noScrollX={true}
    removeTrackYWhenNotUsed
  >
    {children}
  </Scrollbar>
);
