import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
  error: null,
};

export const SocketSlice = createSlice({
  name: "Socket",
  initialState,
  reducers: {
    fetchDataSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});

export const { fetchDataSocket } = SocketSlice.actions;
export default SocketSlice.reducer;
