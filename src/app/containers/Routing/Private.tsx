import { Loader } from 'app/components/Loader';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import { selectAuthState } from '../../../auth/slice';
import { PublicRoutes } from './routes';

export const PrivateRoute: React.FunctionComponent<{
  privateComponent: React.ComponentType<any>;
  path: string;
}> = ({ privateComponent, path, ...rest }) => {
  const authState = useSelector(selectAuthState);

  switch (authState) {
    case 'unAuthenticated': {
      return (
        <Route
          {...rest}
          render={({ location }) => (
            <Redirect
              to={{
                pathname: PublicRoutes.LOGIN,
                state: { from: location },
              }}
            />
          )}
        />
      );
    }
    case 'fetchingInfo': {
      return <Loader />;
    }
    case 'locked': {
      return <p>Locked State...</p>;
    }
    case 'loggedIn': {
      return <Route {...rest} path={path} component={privateComponent} />;
    }
    default:
      return <p>Error!</p>;
  }
};
