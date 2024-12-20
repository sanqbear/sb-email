import {combineReducers} from 'redux';
import loginReducer from '@/contexts/login/loginReducer';

const rootReducer = combineReducers({
  login: loginReducer,
});

export default rootReducer;
