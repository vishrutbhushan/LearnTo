import React from "react";
import { Typography } from "@mui/material";
import { SelectedNodesInfoProps } from "../types";
import { toolbarStyles } from "./styles";
import NodeComponent from "./NodeComponent";

const SelectedNodesInfo: React.FC<SelectedNodesInfoProps> = ({
  selectedNodes,
}) => {
  const classes = toolbarStyles();
  return (
    <div className={classes.verticalGroup}>
      <Typography variant="h6">Selected Nodes</Typography>
      <div className={classes.nodeContainer}>
        {selectedNodes?.fromNode && (
          <NodeComponent name={selectedNodes.fromNode} />
        )}
        {selectedNodes?.toNode && <NodeComponent name={selectedNodes.toNode} />}
      </div>
    </div>
  );
};

export default SelectedNodesInfo;