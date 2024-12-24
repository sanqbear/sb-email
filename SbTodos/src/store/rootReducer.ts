import {combineReducers} from '@reduxjs/toolkit';
import loginReducer from '@/contexts/login/loginReducer';

const rootReducer = combineReducers({
  login: loginReducer,
});

export default rootReducer;
