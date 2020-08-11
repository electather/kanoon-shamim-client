import { PageContainer } from 'app/components/utils/PageContainer';
import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import { vehiclesRoute } from './routes';

export function Vehicle() {
  const { vehicle: vehicleTranslations } = translations.pages;
  const { t } = useTranslation();
  const { url } = useRouteMatch();

  return (
    <PageContainer title={t(vehicleTranslations.title())}>
      <Switch>
        {vehiclesRoute.map((route, idx) => (
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
