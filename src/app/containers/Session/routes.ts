import { RouteKeyType } from 'types/data';

import { SessionDetailsPage } from './components/Doctor/Loadable';
import { SessionInfoPage } from './components/Info/Loadable';
import { SessionListPage } from './components/List/Loadable';
import { NewSessionRequestPage } from './components/New/Loadable';
import { StatisticsPage } from './components/Statistics/Loadable';

export const sessionsRoute: RouteKeyType[] = [
  {
    key: 'list',
    label: 'لیست',
    component: SessionListPage,
  },
  {
    key: 'new',
    label: 'جدید',
    component: NewSessionRequestPage,
  },
  {
    key: 'statistics',
    label: 'آمار',
    component: StatisticsPage,
    hideInSideBar: true,
  },
  {
    key: 'doctor/:id',
    label: 'دکتر',
    component: SessionDetailsPage,
    hideInSideBar: true,
    exact: false,
  },
  {
    key: 'edit/:id',
    label: 'ویرایش',
    component: NewSessionRequestPage,
    exact: false,
    hideInSideBar: true,
  },
  {
    key: 'info/:id',
    label: 'اطلاعات',
    component: SessionInfoPage,
    exact: false,
    hideInSideBar: true,
  },
];
