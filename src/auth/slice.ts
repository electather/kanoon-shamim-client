import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { UserData } from 'userResponse';
import { clearToken, getToken } from 'utils';

import { AuthState, ErrorType, LoginPayload } from './types';

export const initialState: AuthState = {
  authState: getToken() ? 'fetchingInfo' : 'unAuthenticated',
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    fetchUserData(state) {
      state.authState = 'fetchingInfo';
      state.error = undefined;
      state.loading = true;
    },
    login(state, action: PayloadAction<LoginPayload>) {
      state.loading = true;
      state.error = undefined;
    },
    authSuccess(state, action: PayloadAction<UserData>) {
      state.authState = 'loggedIn';
      state.user = action.payload;
      state.error = undefined;
      state.loading = false;
    },
    authFailure(state, action: PayloadAction<ErrorType>) {
      state.authState = 'unAuthenticated';
      state.error = action.payload;
      state.user = undefined;
      state.loading = false;
    },
    logout(state) {
      clearToken();
      state.authState = 'unAuthenticated';
    },
  },
});

export const selectAuthState = createSelector(
  [(state: RootState) => state.auth || initialState],
  auth => auth.authState,
);

export const selectLoggedInUser = createSelector(
  [(state: RootState) => state.auth || initialState],
  auth => auth.user,
);

export const selectAuthError = createSelector(
  [(state: RootState) => state.auth || initialState],
  auth => auth.error,
);

export const selectAuthLoading = createSelector(
  [(state: RootState) => state.auth || initialState],
  auth => auth.loading,
);

export const AuthProviderSelector = createSelector(
  [selectAuthState, selectAuthError, selectAuthLoading],
  (authState, error, isLoading) => {
    return { authState, error, isLoading };
  },
);

export const { actions, reducer, name: sliceKey } = authSlice;
