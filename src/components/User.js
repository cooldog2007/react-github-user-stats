import React from "react";
import styled from "styled-components";

import Card from "./Card";
import Followers from "./Followers";
const User = () => {
  return (
    <Wrapper>
      <Card />
      <Followers />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  display: grid;
  gap: 3rem 2rem;
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
  /* align-items: start; */
`;

export default User;
