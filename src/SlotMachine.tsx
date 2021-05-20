import React from "react";
import styled from "styled-components";

import Reel from "./Reel";

const Container = styled.div`
  border: 1px solid black;
  display: flex;
`;

interface State {
  reelData: Array<{ position: number; slots: string[] }>;
}

const ideas: string[][] = [
  ["A", "B", "C"],
  ["A scalable", "A zero-down-time", "A simple"],
  ["todo", "random idea", "video", "retail"],
  ["app", "generator", "game", "machine learning model"],
  ["using react", "with Go language", "that uses ffmpeg"],
];

export default class SlotMachine extends React.Component<{}, State> {
  state = {
    reelData: ideas.map((idea) => ({ position: 0, slots: idea })),
  };

  componentDidMount() {
    this.update();
  }

  update() {
    this.setState({
      reelData: this.state.reelData.map(({ position, ...rest }, i) => ({
        position: position + 1 + i / 3,
        ...rest,
      })),
    });

    setTimeout(() => this.update(), 16);
  }

  render() {
    const { reelData } = this.state;

    return (
      <Container>
        {reelData.map(({ position, slots }, i) => (
          <Reel key={i} position={position} slots={slots} />
        ))}
      </Container>
    );
  }
}
