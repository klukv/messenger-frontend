import React from "react";
import logo from "../assets/img/logo.svg";
import avatar from "../assets/img/avatar.svg";
import { addComment, getAllComments } from "../services/comment-service";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getAllFriends } from "../services/friend-service";
import {
  setAllFriends,
  setChangeDelete,
  setChangeFriends,
  setDeleteFriends,
} from "../redux/slices/friendSlice";
import "../css/person.css";
import { friend } from "../const/const";
import { TUser } from "../const/constTypes";

type TAllComments = {
  id: number;
  text: string;
  author: TUser;
  owner: TUser;
};

const Person: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [comment, setComment] = React.useState("");
  const [userComments, setUserComments] = React.useState<TAllComments[]>([]);
  const [isChangeUserComments, setChangeUserComments] =
    React.useState<boolean>(true);
  const { user, allFriends, isChangeFriends, isDeleteFriends } = useSelector(
    ({ userSlice, friendSlice }: RootState) => {
      return {
        user: userSlice.user,
        allFriends: friendSlice.allFriends,
        isChangeFriends: friendSlice.ChangeListFriends,
        isDeleteFriends: friendSlice.ChangeDeleteFriends,
      };
    }
  );

  const createCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    addComment(comment, user.id, user.id).then((data) => {
      setChangeUserComments(true);
    });
    event.preventDefault();
  };
  const clickLinkFriend = (friend_id: number) => {
    navigate(friend + "/" + friend_id);
  };
  React.useEffect(() => {
    if (isChangeFriends) {
      getAllFriends(user.id).then((data) => {
        dispatch(setAllFriends(data));
        dispatch(setChangeFriends(false));
      });
    }
    if (isChangeUserComments) {
      getAllComments(user.id).then((data) => {
        setUserComments(data);
        setChangeUserComments(false);
      });
    }
    if (isDeleteFriends) {
      getAllFriends(user.id).then((data) => {
        dispatch(setDeleteFriends(data));
        dispatch(setChangeDelete(false));
      });
    }
  }, [isChangeFriends, isChangeUserComments, isDeleteFriends]);

  return (
    <div className="person">
      <div className="person__inner">
        <div className="person__row">
          <div className="person__info">
            <h1 className="person__info-title">{user.username}</h1>
            <div className="person__info-img">
              <img src={logo} alt="" />
            </div>
          </div>
          <div className="person__comment-block">
            <div className="person__comment-image">
              <img src={avatar} alt="avatar" />
            </div>
            <form
              className="person__comment"
              onSubmit={(event) => createCommentSubmit(event)}
            >
              <input
                type="text"
                className="person__input"
                placeholder="What´s happening?"
                onChange={(event) => setComment(event.target.value)}
                required
              />
              <div className="person__comment-btn">
                <button className="person__comment-button" type="submit">
                  Comment
                </button>
              </div>
            </form>
          </div>
          <div className="person__list-comment">
            <div className="person__list-avatar">
              <img src={avatar} alt="avatar" />
            </div>
            <div className="person__comments-friends">
              <h2 className="person__comments-title">Your comments:</h2>
              <ul className="person__list">
                {userComments.map((comment, index) => (
                  <li key={index} className="person__list-link">
                    <div className="person-name">
                      {comment.author.username}:
                    </div>
                    <div className="person__commentary">{comment.text}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="person__friends">
          <h2 className="person__friends-title">Friends</h2>
          <ul className="person__friends-list">
            {allFriends.map((friend, index) => (
              <li key={index} className="person__friend">
                <div className="person__friend-logo">
                  <img src={logo} alt="logo" />
                </div>
                <div
                  className="person__friend-name"
                  onClick={() => clickLinkFriend(friend.id)}
                >
                  {friend.username}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Person;
