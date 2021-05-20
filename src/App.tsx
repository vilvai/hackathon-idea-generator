import React from "react";
import styled from "styled-components";

import SlotMachine from "./SlotMachine";

const Container = styled.div`
  justify-content: center;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #f1f1f1;
  align-items: center;
`;

const App = () => (
  <Container>
    <SlotMachine />
  </Container>
);

export default App;
