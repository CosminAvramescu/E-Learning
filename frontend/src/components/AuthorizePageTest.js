import { React, useState } from "react";
import { Navigate, NavigationType, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { data } from "jquery";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const AuthroizeTest = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["email", "role"]);
  const navigate = useNavigate();

  if (
    cookies.userId === undefined ||
    cookies.email === undefined ||
    cookies.role === undefined
  ) {
    return <Navigate to="/SignIn" />;
  } else {
    return (
      <h1>
        Hello, {cookies.email}. You are a {cookies.role}
      </h1>
    );
  }
};

export default AuthroizeTest;
