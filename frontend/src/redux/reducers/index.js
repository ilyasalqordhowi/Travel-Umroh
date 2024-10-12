// src/redux/reducers/index.js
import { combineReducers } from "redux";
import auth from "./auth";
import jamaah from "./jamaah";

const rootReducer = combineReducers({
  auth,
  jamaah,
});

export default rootReducer;
