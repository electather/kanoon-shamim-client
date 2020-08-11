import { RouteKeyType } from 'types/data';

import { ClientInfoPage } from './components/Info/Loadable';
import { ClientsPage } from './components/List/Loadable';
import { NewClientPage } from './components/New/Loadable';

export const clientsRoute: RouteKeyType[] = [
  {
    key: 'list',
    label: 'کاربران',
    component: ClientsPage,
  },
  {
    key: 'new',
    label: 'ثبت کاربر جدید',
    component: NewClientPage,
  },
  {
    key: 'edit/:id',
    label: 'ویرایش کاربر',
    component: NewClientPage,
    exact: false,
    hideInSideBar: true,
  },
  {
    key: 'info/:id',
    label: 'اطلاعات کاربر',
    component: ClientInfoPage,
    exact: false,
    hideInSideBar: true,
  },
];
