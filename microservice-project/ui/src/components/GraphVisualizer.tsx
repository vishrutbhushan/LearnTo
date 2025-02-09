// GraphComponent.js
import React from "react";
import { graphVisualizerStyles } from "./styles";
import Toolbar from "./toolbar";
import PlayArea from "./PlayArea";

const GraphVisualizer = () => {
  const classes = graphVisualizerStyles();
  return (
    <div>
      <Toolbar />
      <PlayArea />
    </div>
  );
};

export default GraphVisualizer;
