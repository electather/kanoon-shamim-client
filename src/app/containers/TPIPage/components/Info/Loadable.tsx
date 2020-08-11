/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const TPIInfoPage = lazyLoad(
  () => import('./index'),
  module => module.TPIInfo,
);
