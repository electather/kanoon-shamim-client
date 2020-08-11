import { Loader } from 'app/components/Loader';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import { selectAuthState } from '../../../auth/slice';
import { PrivateRoutes } from './routes';

export const UnAuthenticatedRoute: React.FunctionComponent<{
  unAuthenticatedComponent: React.ComponentType<any>;
  path: string;
}> = ({ unAuthenticatedComponent, path, ...rest }) => {
  const authState = useSelector(selectAuthState);

  switch (authState) {
    case 'loggedIn': {
      return (
        <Route
          {...rest}
          render={({ location }) => (
            <Redirect
              to={{
                pathname: PrivateRoutes.DASHBOARD,
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
    case 'unAuthenticated': {
      return (
        <Route {...rest} path={path} component={unAuthenticatedComponent} />
      );
    }
    default:
      return <p>Error!</p>;
  }
};
