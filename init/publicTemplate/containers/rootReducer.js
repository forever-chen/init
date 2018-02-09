import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'jcloudecc/redux-async-connect';
import funcPermissions from 'jcloudecc/reducer/functionPermissions';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  
  funcPermissions
})
