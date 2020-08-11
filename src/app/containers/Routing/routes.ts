import {
  BookOutlined,
  HomeFilled,
  IdcardFilled,
  TeamOutlined,
} from '@ant-design/icons';
import { translations } from 'locales/i18n';
import { RouteKeyType } from 'types/data';

import { SessionsPage } from '../Appointments/Loadable';
import { HomePage } from '../HomePage/Loadable';
import { TPIPage } from '../TPIPage/Loadable';
import { tpiRoute } from '../TPIPage/routes';
import { UsersPage } from '../Users/Loadable';
import { usersRoute } from '../Users/routes';
import { vehiclesRoute } from '../VehiclePage/routes';

export enum PublicRoutes {
  LOGIN = '/login',
  REGISTER = '/register',
  FORGOT_PASSWORD = '/forgot',
}

export enum PrivateRoutes {
  DASHBOARD = '/dashboard',
}

export const privateRoutes: RouteKeyType[] = [
  {
    key: '',
    label: translations.pages.homePage.title(),
    Icon: HomeFilled,
    component: HomePage,
  },
  {
    key: 'clients',
    label: translations.pages.clients.title(),
    Icon: TeamOutlined,
    component: TPIPage,
    children: tpiRoute,
    exact: false,
  },
  {
    key: 'sessions',
    label: translations.pages.sessions.title(),
    Icon: BookOutlined,
    component: SessionsPage,
    exact: false,
    children: vehiclesRoute,
  },
  {
    key: 'users',
    label: translations.pages.users.title(),
    Icon: IdcardFilled,
    component: UsersPage,
    exact: false,
    children: usersRoute,
  },
];
