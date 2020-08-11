import { PageContainer } from 'app/components/utils/PageContainer';
import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import { usersRoute } from './routes';

export function Users() {
  const { users: usersTranslations } = translations.pages;
  const { t } = useTranslation();
  const { url } = useRouteMatch();

  return (
    <PageContainer title={t(usersTranslations.title())}>
      <Switch>
        {usersRoute.map((route, idx) => (
          <Route
            exact={route.exact === undefined ? true : route.exact}
            key={idx}
            path={`${url}/${route.key}`}
          >
            <route.component />
          </Route>
        ))}
        <Redirect to="/404" />
      </Switch>
    </PageContainer>
  );
}
