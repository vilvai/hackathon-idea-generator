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
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  width: ${SLOT_WIDTH}px;
  height: ${SLOT_AREA_HEIGHT}px;
  position: relative;
  transform-style: preserve-3d;
  perspective: 1800px;
`;

const Shadow = styled.div`
  transform: translateZ(200px);
  position: absolute;
  left: 11px;
  height: 54px;
  width: 96px;
`;

const TopShadow = styled(Shadow)`
  background: linear-gradient(
    180deg,
    hsla(323, 46%, 30%, 0.8) 0%,
    hsla(323, 67%, 31%, 0) 100%
  );

  border-radius: 6px 6px 0 0;
  top: 24px;
`;

const BottomShadow = styled(Shadow)`
  background: linear-gradient(
    0deg,
    hsla(323, 46%, 30%, 0.8) 0%,
    hsla(323, 67%, 31%, 0) 100%
  );

  border-radius: 0 0 6px 6px;
  bottom: 22px;
`;

interface SlotProps {
  rotation: number;
}

const Slot = styled.div.attrs<SlotProps>(({ rotation }) => ({
  style: {
    transform: `rotateX(${rotation + "deg"}) translateZ(${REEL_SIZE}px)`,
    visibility: rotation < 90 && rotation > -90 ? "visible" : "hidden",
  },
}))<SlotProps>`
  top: ${(SLOT_AREA_HEIGHT - SLOT_HEIGHT) / 2}px;
  height: ${SLOT_HEIGHT}px;
  width: ${SLOT_WIDTH}px;
  border: 1px solid #cfb0bb;
  border-radius: 6px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  color: #14213d;
  position: absolute;
  font-weight: bold;
  font-family: "Balsamiq Sans", cursive;
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
      <TopShadow />
      <BottomShadow />
    </Container>
  );
};

export default Reel;
