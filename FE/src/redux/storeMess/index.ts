import { configureStore  } from "@reduxjs/toolkit";
import logger from 'redux-logger';
// import thunk from 'redux-'
import CombineReducer from "./combine";

export const store = configureStore({
    reducer:{
        CombineReducer: CombineReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
export default store;