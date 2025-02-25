import React from "react";
import { TextField, Button } from "@mui/material";
import { NodeControlsProps } from "../types";
import { toolbarStyles } from "./styles";

const NodeControls: React.FC<NodeControlsProps> = ({
  nodeName,
  setNodeName,
  handleAddNode,
}) => {
  const classes = toolbarStyles();
  return (
    <div className={classes.horizontalGroup}>
      <TextField
        label="Node Name"
        value={nodeName}
        onChange={(e) => setNodeName(e.target.value)}
        className={classes.input}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddNode}
        disabled={!nodeName}
        className={classes.button}
      >
        Add Node
      </Button>
    </div>
  );
};

export default NodeControls;