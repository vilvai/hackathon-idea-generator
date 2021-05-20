import React from "react";
import styled from "styled-components";

const HANDLE_HEIGHT = 200;
const HANDLE_WIDTH = 10;
/*
const HANDLE_HOLE_HEIGHT = 100;
const HANDLE_HOLE_WIDTH = 20;
*/
const HANDLE_HEAD_SIZE = 30;

const Container = styled.div`
  width: ${HANDLE_WIDTH}px;
  height: ${HANDLE_HEIGHT}px;
  border-radius: ${HANDLE_WIDTH / 2}px;
  background-color: black;
  margin-left: 24px;
  position: relative;
`;
/*
const HandleHole = styled.div`
  width: ${HANDLE_WIDTH}px;
  height: ${HANDLE_HEIGHT}px;
  border-radius: ${HANDLE_WIDTH / 2}px;
  background-color: black;
  top: ${(HANDLE_HEIGHT - HANDLE_HOLE_HEIGHT) / 2}
  position: absolute;
`;
*/
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
      <HandleHead position={position} onMouseDown={handleMouseDown} />
    </Container>
  );
};

export default Handle;
