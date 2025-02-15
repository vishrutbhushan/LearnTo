// GraphComponent.js
import React, { useEffect } from "react";
import { graphVisualizerStyles } from "./styles";
import Toolbar from "./toolbar";
import PlayArea from "./PlayArea";
import { useSelector } from "react-redux";
import { State } from "../types";

const GraphVisualizer = () => {
  const classes = graphVisualizerStyles();
  const displayNotification = useSelector(
    (state: State) => state.displayNotification
  );

  useEffect(() => {
    if (displayNotification !== "" && displayNotification !== null) {
      const alertTimeout = setTimeout(() => {
        alert(displayNotification);
      }, 5000);

      return () => clearTimeout(alertTimeout);
    }
  }, [displayNotification]);

  return (
    <div className={classes.root}>
      <Toolbar />
      <PlayArea />
    </div>
  );
};

export default GraphVisualizer;
