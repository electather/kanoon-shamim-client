/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const NewInsurancePage = lazyLoad(
  () => import('./index'),
  module => module.NewInsuranceRequest,
);
