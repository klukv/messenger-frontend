import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { initialValuesMessage, login } from "../const/const";
import { setStateChange } from "../redux/slices/userSlice";
import { signUp } from "../services/user-service";
import "../css/auth.css";

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState(initialValuesMessage);
  const arrayRoles: string[] = [];
  const [username, setUsername]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState("");
  const [email, setEmail]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState("");
  const [password, setPassword]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState("");
  const [role, setRole]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState("user");

  arrayRoles.push(role);

  const Register = (event: React.FormEvent<HTMLFormElement>) => {
    signUp(username, email, password, arrayRoles).then(
      (data) => {
        setMessage((prevState) => {
          return {
            ...prevState,
            message: data.message,
            success: true,
          };
        });
        dispatch(setStateChange(true));
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
    event.preventDefault();
  };

  return (
    <div className="register auth">
      <form
        className="register__inner auth__inner"
        onSubmit={(event) => Register(event)}
      >
        {!message.success && (
          <>
            <div className="register__title auth__title">Регистрация</div>
            <div className="register__name">
              <label className="register__name-title auth-name">
                Имя пользователя:
              </label>
              <input
                type="text"
                className="register__name-input input"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </div>
            <div className="register__email">
              <label className="register__email-title auth-name">Email:</label>
              <input
                type="email"
                className="register__email-input input"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="register__password">
              <label className="register__password-title auth-name">
                Пароль:
              </label>
              <input
                type="password"
                className="register__password-input input"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <div className="register__roles">
              <label className="register__roles-title auth-name">Роль:</label>
              <select
                multiple={false}
                className="register__roles-select input"
                value={role}
                onChange={(event) => setRole(event.target.value)}
              >
                <option value="user" className="register__roles-option">
                  Пользователь
                </option>
                <option value="mod" className="register__roles-option">
                  Модератор
                </option>
                <option value="admin" className="register__roles-option">
                  Администратор
                </option>
              </select>
            </div>
            <div className="register__btn btn-auth">
              <button type="submit" className="register__button button-auth">
                Зарегистрироваться
              </button>
            </div>
          </>
        )}

        {message.message && (
          <div className="message__succes">{message.message}</div>
        )}
        {message.success && (
          <Link to={login} className="button__succes button-auth">
            Авторизироваться
          </Link>
        )}
      </form>
    </div>
  );
};

export default Register;
