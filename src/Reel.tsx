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
  height: ${SLOT_HEIGHT * 2.5}px;
  overflow: hidden;
  position: relative;
`;

interface SlotProps {
  position: number;
}

const Slot = styled.div.attrs<SlotProps>(({ position }) => ({
  style: {
    top: position,
  },
}))<SlotProps>`
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
  const actualPosition = position % (slots.length * SLOT_HEIGHT);
  return (
    <Container>
      {slots.map((slot, i) => (
        <Slot
          key={slot}
          position={(i - slots.length) * SLOT_HEIGHT + actualPosition}
        >
          {slot}
        </Slot>
      ))}
      {slots.map((slot, i) => (
        <Slot key={slot} position={i * SLOT_HEIGHT + actualPosition}>
          {slot}
        </Slot>
      ))}
    </Container>
  );
};

export default Reel;
