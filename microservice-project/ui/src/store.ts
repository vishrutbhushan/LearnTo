import { configureStore, MiddlewareArray } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { reducer } from "./reducer";
import rootSaga from "./saga";

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create the Redux store with the reducer and middleware
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware: () => MiddlewareArray<any>) => getDefaultMiddleware().concat(sagaMiddleware),
});

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;