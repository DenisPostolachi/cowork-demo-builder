import { combineReducers } from "redux";
import toolReducer from "./builder/toolReducer";
import cursorReducer from "./builder/cursorReducer";
import sheetReducer from "./builder/sheetReducer";
import authReducer from "./auth/authReducer";
import messageReducer from "./auth/messageReducer";

export default combineReducers({
  tool: toolReducer,
  cursor: cursorReducer,
  sheet: sheetReducer,
  auth: authReducer,
  message: messageReducer,
});
