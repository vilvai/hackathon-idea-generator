import React from "react";
import styled from "styled-components";
import { REEL_SLOTS } from "./constants";
import Handle from "./Handle";

import Reel from "./Reel";

const ReelArea = styled.div`
  background-color: #cec5b9;
  padding: 16px;
  display: flex;
`;

interface State {
  reelData: Array<{ rotation: number; slots: string[]; speed: number }>;
}

const ideas: string[][] = [
  ["A scalable", "A zero-down-time", "A simple"],
  ["todo", "random idea", "video", "retail"],
  ["app", "generator", "game", "machine learning model"],
  ["using react", "with Go language", "that uses ffmpeg"],
];

export default class SlotMachine extends React.Component<{}, State> {
  state = {
    reelData: ideas.map((idea) => ({ rotation: 0, slots: idea, speed: 0 })),
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
      reelData: reelData.map((data) => {
        let { speed, rotation } = data;

        const rotationModulo = rotation % (360 / REEL_SLOTS);

        if (speed < 1) {
          if (rotationModulo > -4) {
            rotation = rotation - rotationModulo;
            speed = 0;
          } else {
            speed += 0.09;
          }
        }

        return {
          ...data,
          rotation: rotation - speed,
          speed: Math.max(0, speed - 0.1),
        };
      }),
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
          {reelData.map(({ rotation, slots }, i) => (
            <Reel key={i} rotation={rotation} slots={slots} />
          ))}
        </ReelArea>
        <Handle onStart={this.startSlotMachine} disabled={this.isRunning} />
      </>
    );
  }
}
