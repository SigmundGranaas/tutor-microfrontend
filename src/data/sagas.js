import { all } from 'redux-saga/effects';
import profileSaga from './sagas/profile';

export default function* rootSaga() {
  yield all([
    profileSaga(),
  ]);
}