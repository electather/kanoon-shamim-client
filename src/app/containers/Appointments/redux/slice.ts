import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { CreateTPI } from 'userRequest';
import { ErrorResponse, Paginated, TPIResponse } from 'userResponse';

import { QuerySchema, TPIState } from './types';

export const initialState: TPIState = {
  loading: false,
};

const tpiSlice = createSlice({
  name: 'tpi',
  initialState,
  reducers: {
    fetchList(state, action: PayloadAction<QuerySchema>) {
      state.loading = true;
      state.error = undefined;
      state.filterData = action.payload;
    },
    fetchDone(state, action: PayloadAction<Paginated<TPIResponse>>) {
      state.loading = false;
      state.error = undefined;
      state.list = action.payload.data;
      state.paginationData = action.payload.meta;
    },
    create(
      state,
      action: PayloadAction<{ data: CreateTPI; clearFn: () => void }>,
    ) {
      state.loading = true;
      state.selectedTpi = undefined;
      state.error = undefined;
    },
    createDone(state, action: PayloadAction<TPIResponse>) {
      state.loading = false;
      state.error = undefined;
      state.selectedTpi = action.payload;
    },
    fetchById(state, action: PayloadAction<string>) {
      state.loading = true;
      state.selectedTpi = undefined;
      state.error = undefined;
    },
    fetchByIdDone(state, action: PayloadAction<TPIResponse>) {
      state.loading = false;
      state.error = undefined;
      state.selectedTpi = action.payload;
    },
    clearSelectedInsurance(state) {
      state.selectedTpi = undefined;
    },
    requestFailed(state, action: PayloadAction<ErrorResponse>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const selectTPIState = createSelector(
  [(state: RootState) => state.tpi || initialState],
  tpi => tpi,
);

export const selectListState = createSelector(
  [selectTPIState],
  ({ list, paginationData, loading }) => ({ list, paginationData, loading }),
);

export const selectDrawerData = createSelector(
  [selectTPIState],
  ({ selectedTpi }) => selectedTpi,
);

export const selectFormData = createSelector(
  [selectTPIState],
  ({ loading, error }) => ({ loading, error }),
);

export const { actions, reducer, name: sliceKey } = tpiSlice;
