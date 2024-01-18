// store/index.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import authReducer from '../static/reducers/authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here if needed
});

const store = createStore(rootReducer, applyMiddleware(thunk));


export default store;
