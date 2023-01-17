import { createSlice } from "@reduxjs/toolkit";
import { TUser } from "../../const/constTypes";

type TComment = {
  id: number;
  text: string;
  author: TUser;
  owner: TUser;
};
type TAllComments = {
  comment: string;
  author: TUser;
};
export interface commentState {
  allComments: TAllComments[];
  allUserComments: TAllComments[];
  isChangeComments: boolean;
  isChangeUserComments: boolean;
}

const initialState: commentState = {
  allComments: [],
  allUserComments: [],
  isChangeComments: true,
  isChangeUserComments: true,
};

export const commentSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setAllComments: (state, action) => {
      action.payload.map((comment: TComment) =>
        state.allComments.push({
          comment: comment.text,
          author: comment.author,
        })
      );
    },
    setChangeComments: (state, action) => {
      state.isChangeComments = action.payload;
    },
    setAllUserComments: (state, action) => {
      action.payload.map((comment: TComment) =>
        state.allUserComments.push({
          comment: comment.text,
          author: comment.author,
        })
      );
    },
    setChangeUserComments: (state, action) => {
      state.isChangeUserComments = action.payload;
    },
  },
});

export const {
  setAllComments,
  setChangeComments,
  setAllUserComments,
  setChangeUserComments,
} = commentSlice.actions;

export default commentSlice.reducer;
