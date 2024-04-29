import { combineReducers } from '@reduxjs/toolkit';
import MessageReducer from '../states/state';
import ChatReducer from '../states/stateChat';

const combineReducer = combineReducers({
    message: MessageReducer,
    chat: ChatReducer,
});

export default combineReducer;