import { ViewType } from 'types/data';

export interface SettingsState {
  readonly collapsed: boolean;
  readonly view: ViewType;
  readonly height: number;
  readonly openDrawer: boolean;
  readonly openKeys: string[];
  readonly current: string[];
}
