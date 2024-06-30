import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rooms: [],
};

export const roomsSlice = createSlice({
  name: "roomsData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addMatcher(
      //   (action) => action.type.startsWith("api/call/pending"),
      //   (state, action) => {
      //   }
      // )
      .addMatcher(
        (action) => action.type.startsWith("api/call/fulfilled"),
        (state, action) => {
          if (action.payload.slice !== "roomsData") return;
          switch (action.meta.arg.endpoint) {
            case "rooms/get-rooms":
              state.rooms = action.payload.data;
              break;
            default:
              break;
          }
        }
      );
  },
});

export const selectRooms = (state) => state.rooms.rooms;
export const selectRoom = (state, roomName) =>
  state.rooms.rooms.find((room) => room.roomName === roomName);

// export const { loginSuccess, loginFailed, updateUser, logout } =
//   roomsSlice.actions;
export default roomsSlice.reducer;
