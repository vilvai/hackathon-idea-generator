import React from "react";
import styled from "styled-components";
import { REEL_SLOTS } from "./constants";

interface Props {
  rotation: number;
  slots: string[];
}

const SLOT_AREA_HEIGHT = 280;

const SLOT_HEIGHT = 100;
const SLOT_WIDTH = 100;

const REEL_SIZE = Math.round(SLOT_HEIGHT / 2 / Math.tan(Math.PI / REEL_SLOTS));

const Container = styled.div`
  margin: 0 8px;
  display: flex;
  flex-direction: column;
  width: ${SLOT_WIDTH}px;
  height: ${SLOT_AREA_HEIGHT}px;
  position: relative;
  transform-style: preserve-3d;
  perspective: 1800px;
`;

interface SlotProps {
  rotation: number;
}

const Slot = styled.div.attrs<SlotProps>(({ rotation }) => {
  return {
    style: {
      transform: `rotateX(${rotation + "deg"}) translateZ(${REEL_SIZE}px)`,
      visibility: rotation > -90 || rotation < -270 ? "visible" : "hidden",
    },
  };
})<SlotProps>`
  top: ${(SLOT_AREA_HEIGHT - SLOT_HEIGHT) / 2}px;
  height: ${SLOT_HEIGHT}px;
  width: ${SLOT_WIDTH}px;
  border: 1px solid #cacaca;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  background-color: white;
  position: absolute;
`;

const Reel = ({ rotation, slots }: Props) => {
  const actualRotation = rotation % ((360 / REEL_SLOTS) * slots.length);

  return (
    <Container>
      {slots.map((slot, i) => (
        <Slot
          key={slot}
          rotation={-(i * 360) / REEL_SLOTS + actualRotation + 45}
        >
          {slot}
        </Slot>
      ))}
      {slots.map((slot, i) => (
        <Slot
          key={slot}
          rotation={
            -((i - slots.length) * 360) / REEL_SLOTS + actualRotation + 45
          }
        >
          {slot}
        </Slot>
      ))}
    </Container>
  );
};

export default Reel;
