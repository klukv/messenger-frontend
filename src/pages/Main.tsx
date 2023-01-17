import React from "react";
import logo from "../assets/img/logo.svg";
import avatar from "../assets/img/avatar.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addMessage, getAllMessages } from "../services/message-service";
import {
  setAllMessages,
  setChangeMessages,
} from "../redux/slices/messageSlice";

const Main: React.FC = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = React.useState("");
  const { allMessages, currentUser, isChangeMessages } = useSelector(
    ({ userSlice, messageSlice }: RootState) => {
      return {
        currentUser: userSlice.user,
        isChangeMessages: messageSlice.isChangeMessages,
        allMessages: messageSlice.allMessages,
      };
    }
  );

  const addMessageSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    addMessage(message, currentUser.id).then((data) =>
      dispatch(setChangeMessages(true))
    );
    event.preventDefault();
  };

  React.useEffect(() => {
    if (isChangeMessages) {
      getAllMessages().then((data) => {
        dispatch(setAllMessages(data));
        dispatch(setChangeMessages(false));
      });
    }
  }, [isChangeMessages]);
  return (
    <div className="main">
      <div className="main__inner">
        <div className="main__row">
          <div className="main__info">
            <h1 className="main__info-title">{currentUser.username}</h1>
            <div className="main__info-img">
              <img src={logo} alt="" />
            </div>
          </div>
          <div className="main__comment-block">
            <div className="main__comment-image">
              <img src={avatar} alt="avatar" />
            </div>
            <form
              className="main__comment"
              onSubmit={(event) => addMessageSubmit(event)}
            >
              <input
                type="text"
                className="main__input"
                placeholder="What´s happening?"
                onChange={(event) => setMessage(event.target.value)}
                required
              />
              <div className="main__comment-btn">
                <button className="main__comment-button" type="submit">
                  Comment
                </button>
              </div>
            </form>
          </div>
          <div className="main__list-comment">
            <div className="main__list-avatar">
              <img src={avatar} alt="avatar" />
            </div>
            <div className="mian__messages">
              <ul className="main__messages-list">
                {allMessages.map((message, index) => (
                  <li key={index} className="main__messages-link">
                    <div className="main__messages-name">
                      {message.author.username}
                    </div>
                    <div className="main__messages-message">{message.text}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
