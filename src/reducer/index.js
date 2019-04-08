import { combineReducers } from "redux";
import billingReducer from "./billingReducer";
import dbReducer from "./dbReducer";
import authReducer from "./authReducer";

export default combineReducers({
  b_table: billingReducer,
  db: dbReducer,
  auth: authReducer
});
