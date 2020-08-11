import { ConfigProvider } from 'antd';
import faIR from 'antd/es/locale/fa_IR';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useInjectReducer } from 'redux-injectors';

import { reducer, sliceKey } from './slice';

export const SettingsProvider = (props: { children: React.ReactChild }) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  const { children } = props;
  const { i18n } = useTranslation();
  return (
    <ConfigProvider direction={i18n.dir()} locale={faIR}>
      {React.Children.only(children)}
    </ConfigProvider>
  );
};
