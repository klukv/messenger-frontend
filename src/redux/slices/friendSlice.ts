import { createSlice } from "@reduxjs/toolkit";
import { TUser } from "../../const/constTypes";

type dataItem = {
  id: number;
  youStr: TUser;
  friends: TUser;
};

export interface friendState {
  allFriends: TUser[];
  ChangeListFriends: boolean;
  ChangeDeleteFriends: boolean;
}

const initialState: friendState = {
  allFriends: [],
  ChangeListFriends: true,
  ChangeDeleteFriends: false,
};

const findError = (allFriends: TUser[], addFriends: TUser) => {
  return allFriends.find(
    (currentFriend) => currentFriend.id === addFriends.id
  ) !== undefined
    ? false
    : true;
};

export const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    setAllFriends: (state, action) => {
      action.payload.map((dataItem: dataItem) => {
        if (findError(state.allFriends, dataItem.friends)) {
          state.allFriends.push(dataItem.friends);
        }
      });
    },
    setChangeFriends: (state, action) => {
      state.ChangeListFriends = action.payload;
    },
    setChangeDelete: (state, action) => {
      state.ChangeDeleteFriends = action.payload;
    },
    setDeleteFriends: (state, action) => {
      state.allFriends = [];
      action.payload.map((dataItem: dataItem) => {
        if (findError(state.allFriends, dataItem.friends)) {
          state.allFriends.push(dataItem.friends);
        }
      });
    },
  },
});

export const {
  setAllFriends,
  setChangeFriends,
  setChangeDelete,
  setDeleteFriends,
} = friendSlice.actions;

export default friendSlice.reducer;
