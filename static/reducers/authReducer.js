// reducers/authReducer.js
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
    isLoggedIn: false,
    user: null,
    token: null,
};

const authPersistConfig = {
    key: 'auth', // 存储的键名
    storage, // 存储引擎，可以选择本地存储、会话存储等
    whitelist: ['isLoggedIn', 'user', 'token'], // 要持久化的状态字段
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          isLoggedIn: true,
          user: action.payload,
          token: action.token,
        };
      case 'LOGOUT':
        return {
          ...state,
          isLoggedIn: false,
          user: null,
          token: null,
        };
      default:
        return state;
    }
  };
  
  export default persistReducer(authPersistConfig, authReducer);
  