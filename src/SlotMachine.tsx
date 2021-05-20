import React from "react";
import styled from "styled-components";
import { SlotMachineColors } from "./colors";
import { REEL_SLOTS } from "./constants";
import Handle from "./Handle";

import Reel from "./Reel";

const MachineBody = styled.div`
  background-color: #ef476f;
  padding: 24px 30px 80px 30px;
  border-radius: 24px 24px 8px 8px;
  box-shadow: 0px 8px 12px 0px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
`;

const ReelArea = styled.div`
  display: flex;
`;

const Title = styled.span`
  font-family: "Yanone Kaffeesatz", sans-serif;
  padding-bottom: 8px;
  font-size: 24pt;
  color: #fff;
  font-weight: bolder;
  margin-left: 8px;
`;

interface State {
  reelData: Array<{ rotation: number; slots: string[]; speed: number }>;
}

const ideas: string[][] = [
  [
    "A scalable",
    "A zero-down-time",
    "A simple",
    "A brute-force",
    "A randomized",
    "Smart",
    "A responsive",
  ],
  [
    "todo",
    "random idea",
    "video",
    "retail",
    "calculator",
    "storage",
    "automated ads",
  ],
  ["app", "generator", "game", "machine learning model"],
  [
    "using react",
    "with Go language",
    "that uses ffmpeg",
    "that's integrated to warren",
    "connected to Facebook",
  ],
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
          speed: 24 + i * 2 + Math.random(),
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
          //rotation: rotation - 1,
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
      <MachineBody>
        <Title>Hackathonmatic 9000</Title>
        <div style={{ display: "flex" }}>
          <ReelArea>
            {reelData.map(({ rotation, slots }, i) => (
              <Reel key={i} rotation={rotation} slots={slots} />
            ))}
          </ReelArea>
          <Handle onStart={this.startSlotMachine} disabled={this.isRunning} />
        </div>
      </MachineBody>
    );
  }
}
