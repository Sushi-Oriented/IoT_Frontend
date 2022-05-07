import { combineReducers } from 'redux';
import { dashboard } from './dashboard'
import { users } from './users'

const rootReducer = combineReducers({
  dashboard,
  users
});

export default rootReducer;