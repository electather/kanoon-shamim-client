/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const NewVehiclePage = lazyLoad(
  () => import('./index'),
  module => module.NewVehicleRequest,
);
