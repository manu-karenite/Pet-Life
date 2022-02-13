import { combineReducers } from "redux";
import userReducer from "./userReducer.js";
import verificationReducer from "./verificationReducer.js";
export const rootReducer = combineReducers({
  user: userReducer,
  verification: verificationReducer,
});
