import React from "react";
import "./LoginScreen.css";

function LoginScreen() {
  return (
    <div className="loginScreen">
      <div className="loginScreen_background">
        <img
          className="loginScreen_logo"
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt="logo"
        />
        <button className="loginScreen_button">Log In</button>

        <div className="loginScreen_gradient" />
      </div>

      <div className="loginScreen_body"></div>
    </div>
  );
}

export default LoginScreen;
