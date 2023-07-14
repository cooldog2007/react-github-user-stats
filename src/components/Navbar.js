import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
    useAuth0();
  console.log(user);
  return (
    <Wrapper>
      <img src={user && user.picture} />
      <h4>
        Welcome, <span>{user && user.email}</span>
      </h4>
      <button
        onClick={() => {
          if (!isAuthenticated) return;
          logout();
        }}
      >
        logout
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  padding: 1.5rem;
  margin-bottom: 4rem;
  background: var(--clr-white);
  text-align: center;
  display: grid;
  grid-template-columns: auto auto 100px;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  span {
    text-transform: uppercase;
    color: var(--clr-grey-2);
    font-weight: bold;
  }
  h4 {
    margin-bottom: 0;
    font-weight: 400;
  }
  img {
    width: 35px !important;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }
  button {
    background: transparent;
    border: transparent;
    font-size: 1.2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    cursor: pointer;
  }
`;

export default Navbar;
