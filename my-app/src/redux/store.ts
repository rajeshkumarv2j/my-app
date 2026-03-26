import { createStore, combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { gadgetsReducer } from "./gadgetsReducer";
import { configureStore } from "@reduxjs/toolkit/react";

const reducer = combineReducers({
    auth: authReducer,
    gadgets: gadgetsReducer
});

// export const store = createStore(reducer,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

export const store = configureStore({reducer, devTools: true})


export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;