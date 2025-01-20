import Preloader from "../../components/common/Preloader";
import HeaderAuth from "../../components/layout/headers/HeaderAuth";
import AuthImageMove from "../../components/component/AuthImageMove";
import LoginForm from "../../components/component/LoginForm";
import React from "react";
import MetaComponent from "../../components/component/MetaComponent";


export default function LoginPage({ setisLoggedIn }) {
  return (
    <div className="main-content">
      <MetaComponent  />
      <Preloader />
      <HeaderAuth />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <section className="form-page js-mouse-move-container">
          <AuthImageMove />
          <LoginForm setisLoggedIn={setisLoggedIn} />
        </section>
      </div>
    </div>
  );
}
