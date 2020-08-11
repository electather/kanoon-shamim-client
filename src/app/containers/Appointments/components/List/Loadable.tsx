/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const SessionListPage = lazyLoad(
  () => import('./index'),
  module => module.SessionList,
);
