import React from "react";
import { NodeComponentToolbarProps } from "../types";
import { toolbarStyles } from "./styles";

const NodeComponent: React.FC<NodeComponentToolbarProps> = ({ name }) => {
  const classes = toolbarStyles();
  return (
    <div className={classes.node}>
      <svg width="50" height="50">
        <circle cx="25" cy="25" r="20" fill="lightgreen" />
        <text x="25" y="25" textAnchor="middle" alignmentBaseline="middle">
          {name}
        </text>
      </svg>
    </div>
  );
};

export default NodeComponent;