import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { initialValuesMessage, main, signup } from "../const/const";
import { saveUser, setIsAuth } from "../redux/slices/userSlice";
import { signIn } from "../services/user-service";
import "../css/auth.css";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState(initialValuesMessage);
  const navigate = useNavigate();
  const [username, setUsername]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState("");
  const [password, setPassword]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState("");
  const handleLogin = () => {
    signIn(username, password).then(
      (data) => {
        setMessage((prevState) => {
          return {
            ...prevState,
            message: data.message,
            success: true,
          };
        });
        dispatch(
          saveUser({
            id: data.id,
            username: data.username,
            email: data.email,
            roles: data.roles,
          })
        );
        dispatch(setIsAuth(true));
        navigate(main);
      },
      (error) =>
        setMessage((prevState) => {
          return {
            ...prevState,
            message: error.message,
            success: false,
          };
        })
    );
  };
  return (
    <div className="register auth">
      <form className="login__inner auth__inner">
        {!message.success && (
          <>
            <div className="login__title auth__title">Авторизация</div>
            <div className="login__name">
              <label className="login__name-title auth-name">
                Имя пользователя:
              </label>
              <input
                type="text"
                className="login__name-input input"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="login__password">
              <label className="login__password-title auth-name">Пароль:</label>
              <input
                type="password"
                className="login__password-input input"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="login__btn btn-auth">
              <button
                className="login__button button-auth"
                type="button"
                onClick={handleLogin}
              >
                Войти
              </button>
            </div>
            <div className="signup__btn">
              Нет аккаунта?
              <Link to={signup} className="signup__btn-link"> Зарегистрироваться</Link>
            </div>
          </>
        )}
        {message.message && (
          <div className="message__succes">{message.message}</div>
        )}
      </form>
    </div>
  );
};

export default Login;
