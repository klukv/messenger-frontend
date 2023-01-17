import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Person from "./pages/Person";
import Register from "./pages/Register";
import "./css/main.css";
import { friend, login, main, person, signup } from "./const/const";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import PageFriend from "./components/pageFriend";

const App: React.FC = () => {
  const navigate = useNavigate();
  const { isAuth } = useSelector(({ userSlice }: RootState) => {
    return {
      isAuth: userSlice.user.isAuth,
    };
  });
  React.useEffect(() => {
    if(!isAuth){
      navigate(login)
    }
  }, [isAuth])
  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path={main} element={<Main />} />
        <Route path={login} element={<Login />} />
        <Route path={signup} element={<Register />} />
        <Route path={person} element={<Person />} />
        <Route path={friend + "/:id"} element={<PageFriend/>} />
      </Routes>
    </div>
  );
};

export default App;
