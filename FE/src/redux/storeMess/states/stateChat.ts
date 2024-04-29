import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataListUser: [] as any,
  curentChat: {} as any,
  newMessage: {} as any,
  loading: false,
  error: null,
};

export const ChatSlice = createSlice({
  name: "globalChat",
  initialState,
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    setCurrentChat: (state, action) => {
      state.loading = false;
      state.curentChat = action.payload;
    },
    setDataListUser:(state, action) => {
      state.dataListUser = action.payload;
    },
    setDataNewMessage:(state, action) => {
      state.newMessage = action.payload;
    },
    fetchDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataFailure, fetchDataStart, setCurrentChat , setDataListUser , setDataNewMessage } =
ChatSlice.actions;
export default ChatSlice.reducer;
