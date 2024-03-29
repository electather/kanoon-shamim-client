/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const ClientInfoPage = lazyLoad(
  () => import('./index'),
  module => module.ClientInfo,
);
