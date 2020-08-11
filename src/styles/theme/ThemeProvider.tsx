import { message, notification } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useInjectReducer } from 'redux-injectors';
import { ThemeProvider as OriginalThemeProvider } from 'styled-components';
import { IranYekanFontLoader } from 'styles/iranyekan';

import { reducer, selectTheme, themeSliceKey } from './slice';

export const ThemeProvider = (props: { children: React.ReactChild }) => {
  useInjectReducer({ key: themeSliceKey, reducer: reducer });
  const { i18n } = useTranslation();

  const theme = useSelector(selectTheme);
  const direction = i18n.dir();
  theme.dir = direction;

  React.useEffect(() => {
    notification.config({
      rtl: direction === 'rtl' ? true : false,
    });
    message.config({
      rtl: direction === 'rtl' ? true : false,
    });
  }, [direction]);
  return (
    <OriginalThemeProvider theme={theme}>
      {React.Children.only(props.children)}
      {i18n.dir() === 'rtl' && <IranYekanFontLoader />}
    </OriginalThemeProvider>
  );
};
