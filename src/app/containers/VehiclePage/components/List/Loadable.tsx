/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const VehiclesListPage = lazyLoad(
  () => import('./index'),
  module => module.VehiclesList,
);
