import { PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { BodyInsuranceResponse, Paginated, TPIResponse } from 'userResponse';
import { getBearerToken } from 'utils';
import { request } from 'utils/request';

import { actions } from './slice';

export function* fetchExpireList({ payload }: PayloadAction<string>) {
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

    const tpiResponse: Paginated<TPIResponse> = yield call(
      request,
      `third-party/`,
      options,
      {
        expiryDateMin: dayjs().calendar('gregory').format('YYYY-MM-DD'),
        expiryDateMax: dayjs()
          .add(10, 'day')
          .calendar('gregory')
          .format('YYYY-MM-DD'),
        take: 20,
      },
    );

    const biiResponse: Paginated<BodyInsuranceResponse> = yield call(
      request,
      `body-insurance/`,
      options,
      {
        expiryDateMin: dayjs().calendar('gregory').format('YYYY-MM-DD'),
        expiryDateMax: dayjs()
          .add(10, 'day')
          .calendar('gregory')
          .format('YYYY-MM-DD'),
        take: 20,
      },
    );

    yield put(
      actions.fetchExpiryListDone({
        bii: biiResponse.data,
        tpi: tpiResponse.data,
      }),
    );
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
export function* homepageSaga() {
  // Watches for fetchUserData actions and calls getUser when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield all([takeLatest(actions.fetchExpiryList.type, fetchExpireList)]);
}
