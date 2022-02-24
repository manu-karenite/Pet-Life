import { combineReducers } from "redux";
import userReducer from "./userReducer.js";
import verificationReducer from "./verificationReducer.js";
import hotelReducer from "./hotelReducer.js";
export const rootReducer = combineReducers({
  user: userReducer,
  verification: verificationReducer,
  hotel: hotelReducer,
});
