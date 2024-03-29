import { RouteKeyType } from 'types/data';

import { UserInfoPage } from './components/Info/Loadable';
import { UsersPage } from './components/List/Loadable';
import { NewUserPage } from './components/New/Loadable';

export const usersRoute: RouteKeyType[] = [
  {
    key: 'list',
    label: 'کاربران',
    component: UsersPage,
  },
  {
    key: 'new',
    label: 'ثبت کاربر جدید',
    component: NewUserPage,
  },
  {
    key: 'edit/:id',
    label: 'ویرایش کاربر',
    component: NewUserPage,
    exact: false,
    hideInSideBar: true,
  },
  {
    key: 'info/:id',
    label: 'اطلاعات کاربر',
    component: UserInfoPage,
    exact: false,
    hideInSideBar: true,
  },
];
