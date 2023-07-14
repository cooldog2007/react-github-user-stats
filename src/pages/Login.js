import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import loginImg from "../images/login-custom.svg";
import { useGlobalContext } from "../context/context";
const Login = () => {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
    useAuth0();
  return (
    <Wrapper>
      <div className="container">
        <div className="img-container">
          <img src={loginImg} />
        </div>
        <h1>please login</h1>
        <button className="btn" onClick={loginWithRedirect}>
          login
        </button>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  .container {
    width: 90vw;
    max-width: 600px;
    text-align: center;
  }
  .img-container {
    display: flex;
    justify-content: center;
  }
  img {
    margin-bottom: 2rem;
    max-height: 400px;
    width: auto;
  }
  h1 {
    margin-bottom: 1.5rem;
  }
`;
export default Login;
