import { combineReducers } from 'redux';
import auth from '../reducers/authReducer';
import group from '../reducers/groupReducer';

export default combineReducers({
    auth,
    group,
});
