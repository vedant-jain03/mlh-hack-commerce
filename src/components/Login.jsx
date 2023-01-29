import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { AiOutlineArrowRight } from 'react-icons/ai'

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className="loginButton" onClick={() => loginWithRedirect()}>Log In <AiOutlineArrowRight style={{marginLeft: '10px'}} /></button>;
};

export default LoginButton;