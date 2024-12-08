import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import appReducer from './userReducer';

const persistCommonConfig = {
    key: 'user',
    storage: storage,
}

const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whitelist: ['isLoggedIn', 'userInfo'],
}

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
    app: appReducer
})

export default rootReducer;
