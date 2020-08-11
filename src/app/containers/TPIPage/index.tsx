import { PageContainer } from 'app/components/utils/PageContainer';
import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import { tpiRoute } from './routes';

export function TPI() {
  const { url } = useRouteMatch();

  const { t } = useTranslation();
  return (
    <PageContainer title={t(translations.pages.thirdPartyInsurance.title())}>
      <Switch>
        {tpiRoute.map((route, idx) => (
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
