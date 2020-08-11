/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const SessionsPage = lazyLoad(
  () => import('./index'),
  module => module.Sessions,
);
