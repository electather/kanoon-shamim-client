/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const ClientsPage = lazyLoad(
  () => import('./index'),
  module => module.Clients,
);
