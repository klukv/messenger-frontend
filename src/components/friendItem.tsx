import React from "react";
import logo from "../assets/img/logo.svg";

function friendItem() {
  return (
    <li className="person__friend">
      <div className="person__friend-logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="person__friend-name">#cigarettesafterher</div>
    </li>
  );
}

export default friendItem;
