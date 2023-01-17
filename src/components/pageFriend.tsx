import React from "react";
import logo from "../assets/img/logo.svg";
import avatar from "../assets/img/avatar.svg";
import { addComment, getAllComments } from "../services/comment-service";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  addFriend,
  deleteFriend,
  getAllFriends,
} from "../services/friend-service";
import { friend, person } from "../const/const";
import "../css/person.css";
import { TFriend, TUser } from "../const/constTypes";
import { getCurrentUser } from "../services/user-service";
import { setChangeDelete, setChangeFriends } from "../redux/slices/friendSlice";

type TAllComments = {
  id: number;
  text: string;
  author: TUser;
  owner: TUser;
};

const PageFriend: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [allFriends, setAllFriends] = React.useState<TFriend[]>([]);
  const [isChangeFriend, setIsChangeFriend] = React.useState<boolean>(true);
  const [comment, setComment] = React.useState("");
  const [allComments, setAllComments] = React.useState<TAllComments[]>([]);
  const [isChangeComments, setIsStateChange] = React.useState<boolean>(true);
  const [currentFriend, setCurrentFriend] = React.useState<TUser>();
  const [isFriendBtn, setIsFriend] = React.useState<boolean>(true);
  const { user, userFriends } = useSelector(
    ({ userSlice, friendSlice }: RootState) => {
      return {
        user: userSlice.user,
        userFriends: friendSlice.allFriends,
      };
    }
  );
  const createCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (id) {
      addComment(comment, user.id, parseInt(id)).then((data) => {
        setIsStateChange(true);
      });
    }
    event.preventDefault();
  };
  const clickLinkFriend = (friend_id: number) => {
    switch (friend_id) {
      case user.id:
        navigate(person);
        break;

      default:
        {
          navigate(friend + "/" + friend_id);
          setIsChangeFriend(true);
          setIsStateChange(true);
        }

        break;
    }
  };
  const isFollowFunc = () => {
    if (id) {
      return userFriends.find((friend, index) => {
        return friend.id === parseInt(id);
      }) === undefined
        ? true
        : false;
    }
  };
  const isFollow = isFollowFunc();
  const clickFollow = () => {
    if (id) {
      if (isFollow) {
        addFriend(user.id, parseInt(id)).then((data) => {
          setIsFriend(false);
          dispatch(setChangeFriends(true));
        });
      } else {
        deleteFriend(user.id, parseInt(id)).then((data) => {
          setIsFriend(true);
          dispatch(setChangeDelete(true));
        });
      }
    }
  };
  React.useEffect(() => {
    if (id) {
      if (isChangeFriend) {
        getAllFriends(parseInt(id)).then((data) => {
          setAllFriends(data);
          setIsChangeFriend(false);
        });
      }

      if (isChangeComments) {
        getAllComments(parseInt(id)).then((data) => {
          setAllComments(data);
          setIsStateChange(false);
        });
      }
      getCurrentUser(parseInt(id)).then((data) => setCurrentFriend(data));
    }
  }, [id, isChangeComments, isChangeFriend]);

  return (
    <div className="person">
      <div className="person__inner">
        <div className="person__row">
          <div className="person__info">
            <h1 className="person__info-title">{currentFriend?.username}</h1>
            <div className="person__info-img">
              <img src={logo} alt="" />
            </div>
            <div className="person__info-btn">
              <button className="person__info-button" onClick={clickFollow}>
                {isFollow ? "Follow" : "Unfollow"}
              </button>
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
                {allComments.map((comment, index) => (
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
                  onClick={() => clickLinkFriend(friend.friends.id)}
                >
                  {friend.friends.username}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PageFriend;
