import Preloader from "../../components/common/Preloader";
import HeaderAuth from "../../components/layout/headers/HeaderAuth";
import AuthImageMove from "../../components/component/AuthImageMove";
import React from "react";
import MetaComponent from "../../components/component/MetaComponent";
import SignUpForm from "./SignUpForm";


export default function SingUpPage({ setisLoggedIn }) {
  return (
    <div className="main-content">
      <MetaComponent  />
      <Preloader />
      <HeaderAuth />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <section className="form-page js-mouse-move-container">
          <AuthImageMove />
          <SignUpForm setisLoggedIn={setisLoggedIn} />
        </section>
      </div>
    </div>
  );
}
