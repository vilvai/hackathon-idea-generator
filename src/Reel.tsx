import React from "react";
import styled from "styled-components";

interface Props {
  position: number;
  slots: string[];
}

const SLOT_HEIGHT = 100;
const SLOT_WIDTH = 100;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${SLOT_WIDTH}px;
  height: ${SLOT_HEIGHT * 2}px;
  // overflow: hidden;
  position: relative;
  transform-style: preserve-3d;
  perspective: 1600px;
`;

interface SlotProps {
  rotation: number;
  tz: number;
}

const Slot = styled.div.attrs<SlotProps>(({ rotation, tz }) => ({
  style: {
    transform: `rotateX(${rotation + "deg"}) translateZ(${tz}px)`,
  },
}))<SlotProps>`
  top: ${SLOT_HEIGHT / 2}px;
  height: ${SLOT_HEIGHT}px;
  width: ${SLOT_WIDTH}px;
  border: 1px solid red;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  background-color: white;
  flex-shrink: 0;
  position: absolute;
`;

const Reel = ({ position, slots }: Props) => {
  var tz = Math.round( ( SLOT_HEIGHT / 2 ) /  Math.tan( Math.PI / slots.length ) );
  return (
    <Container>
      {slots.map((slot, i) => (
        <Slot key={slot} tz={tz} rotation={position * (i + 1) % 360}>
          {slot}
        </Slot>
      ))}
    </Container>
  );
};

export default Reel;
