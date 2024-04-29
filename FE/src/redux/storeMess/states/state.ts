import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  latestMesage: {} as any,
  data: [] as any,
  loading: false,
  error: null,
};

export const MessageSlice = createSlice({
  name: "globalMessage",
  initialState,
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataFailure, fetchDataStart, fetchDataSuccess } =
MessageSlice.actions;
export default MessageSlice.reducer;
