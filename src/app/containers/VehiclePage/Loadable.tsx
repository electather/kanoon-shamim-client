/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const VehiclePage = lazyLoad(
  () => import('./index'),
  module => module.Vehicle,
);
