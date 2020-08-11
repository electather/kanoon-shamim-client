import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { ErrorResponse, UserDataMinimal } from 'userResponse';

import { ExpiryList, HomePageState, QuerySchema } from './types';

export const initialState: HomePageState = {
  loading: false,
};

const homeSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    fetchStats(state) {
      state.loading = true;
      state.error = undefined;
    },
    fetchStatsDone(state, action: PayloadAction<UserDataMinimal>) {
      state.loading = false;
      state.error = undefined;
      state.stats = action.payload;
    },
    fetchExpiryList(state, action: PayloadAction<QuerySchema>) {
      state.loading = true;
      state.expireList = undefined;
      state.error = undefined;
    },
    fetchExpiryListDone(state, action: PayloadAction<ExpiryList>) {
      state.loading = false;
      state.error = undefined;
      state.expireList = action.payload;
    },
    requestFailed(state, action: PayloadAction<ErrorResponse>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const selectUsersState = createSelector(
  [(state: RootState) => state.homePage || initialState],
  users => users,
);

export const selectRenewal = createSelector(
  [selectUsersState],
  ({ expireList, loading }) => ({ expireList, loading }),
);

export const { actions, reducer, name: sliceKey } = homeSlice;
