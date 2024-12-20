import {all} from 'redux-saga/effects';
import {loginSaga} from '@/contexts/login/loginSaga';

const rootSaga = function* () {
  yield all([loginSaga()]);
};

export default rootSaga;
