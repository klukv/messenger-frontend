import userSlice from "./slices/userSlice";
import messageSlice from "./slices/messageSlice";
import friendSlice from "./slices/friendSlice";
import commentSlice from "./slices/commentSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: { userSlice, messageSlice, commentSlice, friendSlice },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;