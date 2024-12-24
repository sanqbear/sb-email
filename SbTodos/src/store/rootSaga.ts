import {all} from 'redux-saga/effects';
import {watchLoginSaga} from '@/contexts/login/loginSaga';

export default function* rootSaga() {
  yield all([watchLoginSaga()]);
}
