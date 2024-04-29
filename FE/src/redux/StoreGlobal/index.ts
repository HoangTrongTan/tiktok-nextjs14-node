import { configureStore } from "@reduxjs/toolkit";
import CombineReducer from './combine';

const storeGlobal = configureStore({
    reducer: {
        CombineReducerGlobal: CombineReducer
    }
});

export default storeGlobal;