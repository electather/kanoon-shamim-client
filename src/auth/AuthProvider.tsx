import { message } from 'antd';
import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import { getUserSaga } from './saga';
import { actions, AuthProviderSelector, reducer, sliceKey } from './slice';

const key = 'authMessage';
export const AuthProvider = (props: { children: React.ReactChild }) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: getUserSaga });
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { authState, error, isLoading } = useSelector(AuthProviderSelector);

  React.useEffect(() => {
    if (authState === 'fetchingInfo') {
      dispatch(actions.fetchUserData());
    }
  });

  React.useEffect(() => {
    if (isLoading) {
      message.loading({ content: t(translations.global.loading()), key });
    } else if (!isLoading && authState === 'loggedIn') {
      message.success({
        content: t(translations.authPage.shared.loginSuccess()),
        key,
      });
    }
  }, [isLoading, authState, t]);

  React.useEffect(() => {
    if (error) {
      message.error({
        content: t(translations.errorMessages.auth?.[error]()),
        duration: 7,
        key,
      });
    }
  }, [error, t]);

  const { children } = props;

  return <React.Fragment>{React.Children.only(children)}</React.Fragment>;
};
