import { combineReducers } from "redux";
import userReducer from "./user/userSlice";
import appSlice from "./app";
import roomsSlice from "./rooms/roomsSlice";

const rootReducer = combineReducers({
  user: userReducer,
  app: appSlice,
  rooms: roomsSlice,
});

export default rootReducer;
