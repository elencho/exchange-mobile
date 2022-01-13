import { call, put, select, takeLatest } from 'redux-saga/effects';

import { actionTypes, saveCountries, saveCountriesConstant } from './actions';
import { getParams } from './selectors';
import { fetchCountries } from '../../utils/userProfileUtils';

function* fetchCountriesSaga() {
  const countries = yield call(fetchCountries);
  yield put(saveCountries(countries));
  yield put(saveCountriesConstant(countries));
}

export default function* () {
  yield takeLatest(actionTypes.FETCH_COUNTRIES_SAGA, fetchCountriesSaga);
}
