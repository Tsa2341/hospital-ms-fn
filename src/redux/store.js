/* eslint-disable comma-dangle */
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import allReducers from "./reducers";

const initialState = {};
const middleware = [thunk];
/* istanbul ignore next */
const store = createStore(
  allReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
