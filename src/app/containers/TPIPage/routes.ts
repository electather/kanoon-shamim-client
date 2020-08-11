import { RouteKeyType } from 'types/data';

import { TPIInfoPage } from './components/Info/Loadable';
import { InsurancePage } from './components/List/Loadable';
import { NewInsurancePage } from './components/New/Loadable';
import { StatisticsPage } from './components/Statistics/Loadable';

export const tpiRoute: RouteKeyType[] = [
  {
    key: 'list',
    label: 'لیست بیمه ها',
    component: InsurancePage,
  },
  {
    key: 'new',
    label: 'ثبت بیمه جدید',
    component: NewInsurancePage,
  },
  {
    key: 'statistics',
    label: 'آمار و اطلاعات',
    component: StatisticsPage,
    hideInSideBar: false,
  },
  {
    key: 'edit/:id',
    label: 'ویرایش بیمه',
    component: NewInsurancePage,
    exact: false,
    hideInSideBar: true,
  },
  {
    key: 'info/:id',
    label: 'جزئیات بیمه',
    component: TPIInfoPage,
    exact: false,
    hideInSideBar: true,
  },
];
