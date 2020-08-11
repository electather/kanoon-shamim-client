import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { CreateTPI } from 'userRequest';
import { Paginated, TPIResponse } from 'userResponse';
import { getBearerToken } from 'utils';
import { request } from 'utils/request';

import { actions } from './slice';
import { QuerySchema } from './types';

export function* fetchList({ payload }: PayloadAction<QuerySchema>) {
  if (process.env.REACT_APP_MOCK === 'true') {
    return;
  }
  try {
    // Call our request helper (see 'utils/request')
    const options: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: getBearerToken(),
      },
    };

    const response: Paginated<TPIResponse> = yield call(
      request,
      `third-party`,
      options,
      payload,
    );
    yield put(actions.fetchDone(response));
  } catch (err) {
    if (err.response?.statusCode) {
      yield put(actions.requestFailed(err.response));
    } else {
      yield put(actions.requestFailed({ message: 'خطا در ارتباط با سرور' }));
    }
  }
}

export function* createUser({
  payload,
}: PayloadAction<{ data: CreateTPI; clearFn: () => void }>) {
  if (process.env.REACT_APP_MOCK === 'true') {
    return;
  }
  try {
    // Call our request helper (see 'utils/request')
    const options: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: getBearerToken(),
      },
      body: JSON.stringify(payload.data),
    };

    const response: TPIResponse = yield call(request, `third-party`, options);
    payload.clearFn();
    yield put(actions.createDone(response));
  } catch (err) {
    if (err.response?.statusCode) {
      yield put(actions.requestFailed(err.response));
    } else {
      yield put(actions.requestFailed({ message: 'خطا در ارتباط با سرور' }));
    }
  }
}

export function* fetchById({ payload }: PayloadAction<string>) {
  if (process.env.REACT_APP_MOCK === 'true') {
    return;
  }
  try {
    // Call our request helper (see 'utils/request')
    const options: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: getBearerToken(),
      },
    };

    const response: TPIResponse = yield call(
      request,
      `third-party/${payload}`,
      options,
    );
    yield put(actions.fetchByIdDone(response));
  } catch (err) {
    if (err.response?.statusCode) {
      yield put(actions.requestFailed(err.response));
    } else {
      yield put(actions.requestFailed({ message: 'خطا در ارتباط با سرور' }));
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* tpiSaga() {
  // Watches for fetchUserData actions and calls getUser when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield all([
    takeLatest(actions.fetchList.type, fetchList),
    takeLatest(actions.create.type, createUser),
    takeLatest(actions.fetchById.type, fetchById),
  ]);
}
