/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const SessionDetailsPage = lazyLoad(
  () => import('./index'),
  module => module.SessionDetails,
);
