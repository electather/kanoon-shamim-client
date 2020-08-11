import { Loader } from 'app/components/Loader';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { selectAuthState } from '../../../auth/slice';
import { PrivateRoutes, PublicRoutes } from './routes';

export const MainRoute: React.FunctionComponent = () => {
  const authState = useSelector(selectAuthState);

  switch (authState) {
    case 'loggedIn': {
      return <Redirect to={PrivateRoutes.DASHBOARD} />;
    }
    case 'fetchingInfo': {
      return <Loader />;
    }
    case 'locked': {
      return <p>Locked State...</p>;
    }
    case 'unAuthenticated': {
      return <Redirect to={PublicRoutes.LOGIN} />;
    }
    default:
      return <p>Error!</p>;
  }
};
