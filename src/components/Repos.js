import React from "react";
import styled from "styled-components";
import { memo } from "react";
import { GithubContext, useGlobalContext } from "../context/context";
import {
  ExampleChart,
  Pie3DComponent,
  Column3D,
  Bar3D,
  Doughnut2D,
} from "./Charts";

const Repos = ({ login }) => {
  return (
    <>
      <Wrapper>
        <div>
          <Pie3DComponent login={login} />
        </div>
        <div>
          <Column3D />
        </div>
      </Wrapper>
      <Wrapper>
        <div>
          <Doughnut2D />
        </div>
        <div>
          <Bar3D />
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  margin-top: 2rem;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }

  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
