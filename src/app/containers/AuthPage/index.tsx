import { Loader } from 'app/components/Loader';
import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Route, Switch } from 'react-router-dom';

import { PublicRoutes } from '../Routing/routes';
import { AuthContainer } from './components/AuthContainer';
import { ForgotPasswordPage } from './components/ForgotPass/Loadable';
import { LoginPage } from './components/Login/Loadable';
import { RegisterPage } from './components/Register/Loadable';

export function AuthPage() {
  const { t } = useTranslation();

  return (
    <AuthContainer>
      <div className="isoLoginContentWrapper">
        <div className="isoLoginContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">{t(translations.global.siteName())}</Link>
          </div>
          <React.Suspense fallback={<Loader />}>
            <Switch>
              <Route exact path={PublicRoutes.LOGIN} component={LoginPage} />
              <Route
                exact
                path={PublicRoutes.REGISTER}
                component={RegisterPage}
              />
              <Route
                exact
                path={PublicRoutes.FORGOT_PASSWORD}
                component={ForgotPasswordPage}
              />
            </Switch>
          </React.Suspense>
        </div>
      </div>
    </AuthContainer>
  );
}
