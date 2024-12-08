import { combineReducers } from 'redux';
import appReducer from './userReducer';

const rootReducer = combineReducers({
    user: appReducer,
    app: appReducer
});

export default rootReducer;
