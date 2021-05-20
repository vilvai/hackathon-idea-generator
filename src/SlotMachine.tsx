import React from "react";
import styled from "styled-components";
import Handle from "./Handle";

import Reel from "./Reel";

const ReelArea = styled.div`
  border: 1px solid black;
  display: flex;
`;

interface State {
  reelData: Array<{ position: number; slots: string[]; speed: number }>;
}

const ideas: string[][] = [
  ["A scalable", "A zero-down-time", "A simple"],
  ["todo", "random idea", "video", "retail"],
  ["app", "generator", "game", "machine learning model"],
  ["using react", "with Go language", "that uses ffmpeg"],
];

export default class SlotMachine extends React.Component<{}, State> {
  state = {
    reelData: ideas.map((idea) => ({ position: 0, slots: idea, speed: 0 })),
  };

  startSlotMachine = () => {
    this.setState(
      {
        reelData: this.state.reelData.map((data, i) => ({
          ...data,
          speed: 25 + i * 2,
        })),
      },
      this.update
    );
  };

  update() {
    const { reelData } = this.state;
    this.setState({
      reelData: reelData.map((data) => ({
        ...data,
        position: data.position + data.speed,
        speed: Math.max(0, data.speed - 0.1),
      })),
    });

    if (this.isRunning) {
      setTimeout(() => this.update(), 16);
    }
  }

  get isRunning() {
    return this.state.reelData.some(({ speed }) => speed > 0);
  }

  render() {
    const { reelData } = this.state;

    return (
      <>
        <ReelArea>
          {reelData.map(({ position, slots }, i) => (
            <Reel key={i} position={position} slots={slots} />
          ))}
        </ReelArea>
        <Handle onStart={this.startSlotMachine} disabled={this.isRunning} />
      </>
    );
  }
}
