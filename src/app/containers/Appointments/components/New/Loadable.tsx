/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const NewSessionRequestPage = lazyLoad(
  () => import('./index'),
  module => module.NewSessionRequest,
);
