import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 10px;
  height: 200px;
  border-radius: 5px;
  background-color: black;
  margin-left: 16px;
  position: relative;
`;

interface HandleHeadProps {
  position: number;
}

const HandleHead = styled.div.attrs<HandleHeadProps>(({ position }) => ({
  style: {
    top: position,
  },
}))<HandleHeadProps>`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: red;
  position: absolute;
`;

interface Props {
  onStart: () => void;
  disabled: boolean;
}

const Handle = ({ onStart, disabled }: Props) => {
  //const [position, setPosition] = React.useState(0);

  //const onMouseMove = (e) => {};

  return (
    <Container onClick={disabled ? undefined : onStart}>
      <HandleHead position={0} />
    </Container>
  );
};

export default Handle;
