/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const TPIPage = lazyLoad(
  () => import('./index'),
  module => module.TPI,
);
