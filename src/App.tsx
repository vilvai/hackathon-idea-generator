import React from "react";
import styled from "styled-components";
import { Colors } from "./colors";

import SlotMachine from "./SlotMachine";

const Container = styled.div`
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #ffc6ff;
  align-items: center;
`;

const Title = styled.span`
  font-family: "Yanone Kaffeesatz", sans-serif;
  font-size: 56pt;
  margin-top: 40px;
  color: #1d3557;
  font-weight: bolder;
`;

const App = () => (
  <Container>
    <SlotMachine />
    <Title>Pull the lever!</Title>
  </Container>
);

export default App;
