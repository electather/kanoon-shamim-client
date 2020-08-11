import { RouteKeyType } from 'types/data';

import { SessionInfoPage } from './components/Info/Loadable';
import { SessionListPage } from './components/List/Loadable';
import { NewSessionRequestPage } from './components/New/Loadable';
import { StatisticsPage } from './components/Statistics/Loadable';

export const sessionsRoute: RouteKeyType[] = [
  {
    key: 'list',
    label: 'list',
    component: SessionListPage,
  },
  {
    key: 'new',
    label: 'new',
    component: NewSessionRequestPage,
  },
  {
    key: 'statistics',
    label: 'statistics',
    component: StatisticsPage,
    hideInSideBar: false,
  },
  {
    key: 'edit/:id',
    label: 'edit',
    component: NewSessionRequestPage,
    exact: false,
    hideInSideBar: true,
  },
  {
    key: 'info/:id',
    label: 'info',
    component: SessionInfoPage,
    exact: false,
    hideInSideBar: true,
  },
];
