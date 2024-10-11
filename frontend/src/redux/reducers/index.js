// src/redux/reducers/index.js
import { combineReducers } from "redux";
import authReducer from "./auth";
import jamaahReducer from "./jamaah";

const rootReducer = combineReducers({
  auth: authReducer,
  jamaah: jamaahReducer,
});

export default rootReducer;
