import React from "react";
import styled from "styled-components";

const HANDLE_HEIGHT = 280;
const HANDLE_WIDTH = 10;

const HANDLE_HOLE_HEIGHT = 150;
const HANDLE_HOLE_WIDTH = 16;

const HANDLE_HEAD_SIZE = 30;

const Container = styled.div`
  width: ${HANDLE_WIDTH}px;
  height: ${HANDLE_HEIGHT}px;
  border-radius: ${HANDLE_WIDTH / 2}px;
  margin-left: 24px;
  position: relative;
`;

const HandleHole = styled.div`
  width: ${HANDLE_HOLE_WIDTH}px;
  height: ${HANDLE_HOLE_HEIGHT}px;
  border-radius: ${HANDLE_HOLE_WIDTH / 2}px;
  background-color: #333333;
  top: ${(HANDLE_HEIGHT - HANDLE_HOLE_HEIGHT) / 2}px;
  left: ${(HANDLE_WIDTH - HANDLE_HOLE_WIDTH) / 2}px;
  position: absolute;
`;

interface HandleBarProps {
  position: number;
}

const HandleBar = styled.div.attrs<HandleBarProps>(({ position }) => {
  const handleMoveArea = HANDLE_HOLE_HEIGHT - 14;
  const startPosition = position;
  const endPosition =
    (HANDLE_HEIGHT - handleMoveArea) / 2 +
    (position * handleMoveArea) / HANDLE_HEIGHT;
  return {
    style: {
      top: Math.min(startPosition, endPosition) - HANDLE_WIDTH / 2,
      height: Math.abs(endPosition - startPosition),
    },
  };
})<HandleBarProps>`
  width: 0px;
  border: ${HANDLE_WIDTH / 2}px solid #a07f5d;
  border-radius: ${HANDLE_WIDTH / 2}px;
  position: absolute;
  left: 0px;
`;

interface HandleHeadProps {
  position: number;
}

const HandleHead = styled.div.attrs<HandleHeadProps>(({ position }) => ({
  style: {
    top: position - HANDLE_HEAD_SIZE / 2,
  },
}))<HandleHeadProps>`
  width: ${HANDLE_HEAD_SIZE}px;
  height: ${HANDLE_HEAD_SIZE}px;
  border-radius: ${HANDLE_HEAD_SIZE / 2}px;
  background: radial-gradient(
    circle,
    rgba(255, 0, 0, 1) 20%,
    rgba(107, 0, 0, 1) 100%
  );
  position: absolute;
  left: -${(HANDLE_HEAD_SIZE - HANDLE_WIDTH) / 2}px;
`;

interface Props {
  onStart: () => void;
  disabled: boolean;
}

const Handle = ({ onStart, disabled }: Props) => {
  const [position, _setPosition] = React.useState(0);
  const positionRef = React.useRef(position);
  const setPosition = (value: number) => {
    positionRef.current = value;
    _setPosition(value);
  };
  const [handleElementPosition, setHandleElementPosition] = React.useState(0);
  const containerRef = React.createRef<HTMLDivElement>();

  React.useEffect(() => {
    const boundingClientRect = containerRef.current?.getBoundingClientRect();
    if (!boundingClientRect) return;
    setHandleElementPosition(boundingClientRect.top);
  }, [containerRef]);

  const handleMouseDown = () => {
    if (disabled) return;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", () => {
      if (positionRef.current >= HANDLE_HEIGHT) onStart();
      setPosition(0);
      document.removeEventListener("mousemove", handleMouseMove);
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    const position = e.pageY - handleElementPosition;
    const cappedPosition = Math.min(HANDLE_HEIGHT, Math.max(position, 0));
    setPosition(cappedPosition);
  };

  return (
    <Container ref={containerRef}>
      <HandleHole />
      <HandleBar position={position} />
      <HandleHead position={position} onMouseDown={handleMouseDown} />
    </Container>
  );
};

export default Handle;
