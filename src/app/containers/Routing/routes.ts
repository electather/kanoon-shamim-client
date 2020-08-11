import {
  BookOutlined,
  HomeFilled,
  IdcardFilled,
  TeamOutlined,
} from '@ant-design/icons';
import { translations } from 'locales/i18n';
import { RouteKeyType } from 'types/data';

import { ClientsPage } from '../Clients/Loadable';
import { clientsRoute } from '../Clients/routes';
import { HomePage } from '../HomePage/Loadable';
import { SessionsPage } from '../Session/Loadable';
import { sessionsRoute } from '../Session/routes';
import { UsersPage } from '../Users/Loadable';
import { usersRoute } from '../Users/routes';

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
    component: ClientsPage,
    children: clientsRoute,
    exact: false,
  },
  {
    key: 'sessions',
    label: translations.pages.sessions.title(),
    Icon: BookOutlined,
    component: SessionsPage,
    exact: false,
    children: sessionsRoute,
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
