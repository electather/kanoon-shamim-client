import { RouteKeyType } from 'types/data';

import { VehicleInfoPage } from './components/Info/Loadable';
import { VehiclesListPage } from './components/List/Loadable';
import { NewVehiclePage } from './components/New/Loadable';
import { StatisticsPage } from './components/Statistics/Loadable';

export const vehiclesRoute: RouteKeyType[] = [
  {
    key: 'list',
    label: 'خودرو ها',
    component: VehiclesListPage,
  },
  {
    key: 'new',
    label: 'ثبت خودرو جدید',
    component: NewVehiclePage,
  },
  {
    key: 'statistics',
    label: 'آمار و اطلاعات',
    component: StatisticsPage,
    hideInSideBar: true,
  },
  {
    key: 'edit/:id',
    label: 'ویرایش خودرو',
    component: NewVehiclePage,
    exact: false,
    hideInSideBar: true,
  },
  {
    key: 'info/:id',
    label: 'جزئیات خودرو',
    component: VehicleInfoPage,
    exact: false,
    hideInSideBar: true,
  },
];
