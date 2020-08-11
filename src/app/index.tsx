/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { translations } from 'locales/i18n';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Route, Switch } from 'react-router-dom';
import { GlobalStyle } from 'styles/global-styles';

import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { AuthPage } from './containers/AuthPage/Loadable';
import { DashboardPage } from './containers/Dashboard/Loadable';
import { MainRoute } from './containers/Routing/MainRoute';
import { PrivateRoute } from './containers/Routing/Private';
import { PrivateRoutes, PublicRoutes } from './containers/Routing/routes';
import { UnAuthenticatedRoute } from './containers/Routing/UnAuthenticated';
export function App() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet
        titleTemplate={`%s - ${t(translations.global.siteName())}`}
        defaultTitle={t(translations.global.siteName())}
      >
        <meta name="description" content={t(translations.global.siteDesc())} />
      </Helmet>
      <Switch>
        <Route path="/" exact component={MainRoute} />
        <UnAuthenticatedRoute
          path={PublicRoutes.LOGIN}
          unAuthenticatedComponent={AuthPage}
        />
        <UnAuthenticatedRoute
          path={PublicRoutes.REGISTER}
          unAuthenticatedComponent={AuthPage}
        />

        <UnAuthenticatedRoute
          path={PublicRoutes.FORGOT_PASSWORD}
          unAuthenticatedComponent={AuthPage}
        />

        <PrivateRoute
          privateComponent={DashboardPage}
          path={PrivateRoutes.DASHBOARD}
        />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </>
  );
}
