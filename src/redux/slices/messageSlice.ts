import { createSlice } from "@reduxjs/toolkit";
import { TUser } from "../../const/constTypes";

type TMessage = {
  id: number;
  text: string;
  author: TUser;
};

export interface userState {
  allMessages: TMessage[];
  isChangeMessages: boolean;
}

const initialState: userState = {
  allMessages: [],
  isChangeMessages: true,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setAllMessages: (state, action) => {
      state.allMessages = action.payload;
    },
    setChangeMessages: (state, action) => {
      state.isChangeMessages = action.payload;
    },
  },
});

export const {  setAllMessages, setChangeMessages } =
  messageSlice.actions;

export default messageSlice.reducer;
