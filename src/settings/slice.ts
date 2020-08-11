import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCurrentKey, getOpenKeys } from 'app/containers/Routing/utlils';
import { RootState } from 'types';
import { getView, isServer } from 'utils';

import { SettingsState } from './types';

export const initialState: SettingsState = {
  collapsed: !isServer && window.innerWidth > 1220 ? false : true,
  height: !isServer ? window.innerHeight : 0,
  view: !isServer ? getView(window.innerWidth) : 'DesktopView',
  openDrawer: false,
  current: getCurrentKey(),
  openKeys: getOpenKeys(),
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    toggleAll(
      state,
      { payload }: PayloadAction<{ width: number; height: number }>,
    ) {
      const view = getView(payload.width);
      const collapsed = view !== 'DesktopView';
      if (state.view !== view || payload.height !== state.height) {
        const height = payload.height ? payload.height : state.height;
        state.collapsed = collapsed;
        state.view = view;
        state.height = height;
      }
    },
    toggleOpenDrawer(
      state,
      { payload }: PayloadAction<{ openDrawer: boolean }>,
    ) {
      state.openDrawer = payload.openDrawer;
    },
    changeOpenKeys(state, { payload }: PayloadAction<string[]>) {
      state.openKeys = payload;
    },
    changeCurrent(state, { payload }: PayloadAction<string[]>) {
      state.current = payload;
    },
  },
});

export const selectSettings = createSelector(
  [(state: RootState) => state.settings || initialState],
  settings => settings,
);

export const selectCollapsed = createSelector(
  [(state: RootState) => state.settings || initialState],
  settings => settings.collapsed,
);

export const selectHeight = createSelector(
  [(state: RootState) => state.settings || initialState],
  settings => settings.height,
);

export const selectView = createSelector(
  [(state: RootState) => state.settings || initialState],
  settings => settings.view,
);

export const selectOpenDrawer = createSelector(
  [(state: RootState) => state.settings || initialState],
  settings => settings.openDrawer,
);

export const selectCurrent = createSelector(
  [(state: RootState) => state.settings || initialState],
  settings => settings.current,
);

export const selectOpenKeys = createSelector(
  [(state: RootState) => state.settings || initialState],
  settings => settings.openKeys,
);

export const selectRouter = createSelector(
  [(state: RootState) => state.router],
  router => router?.location,
);

export const { actions, reducer, name: sliceKey } = settingsSlice;
