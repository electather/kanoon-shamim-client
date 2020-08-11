/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const UserInfoPage = lazyLoad(
  () => import('./index'),
  module => module.UserInfo,
);
