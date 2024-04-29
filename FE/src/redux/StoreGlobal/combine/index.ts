import { combineReducers } from "@reduxjs/toolkit";
import socketReducer from '../slice/notifi';

const combineGlobalReducer = combineReducers({
    socket: socketReducer
});
export default combineGlobalReducer;