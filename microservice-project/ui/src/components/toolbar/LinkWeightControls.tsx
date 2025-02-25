import React from "react";
import { TextField, Button } from "@mui/material";
import { LinkWeightControlsProps } from "../types";
import { toolbarStyles } from "./styles";

const LinkWeightControls: React.FC<LinkWeightControlsProps> = ({
  linkWeight,
  setLinkWeight,
  handleUpdateWeight,
  initialLinkWeight,
  selectedNodes,
}) => {
  const classes = toolbarStyles();
  return (
    <div className={classes.horizontalGroup}>
      <TextField
        label="Link Weight"
        type="number"
        value={linkWeight}
        disabled={!selectedNodes?.fromNode || !selectedNodes?.toNode}
        onChange={(e) => setLinkWeight(Number(e.target.value))}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdateWeight}
        disabled={
          !selectedNodes?.fromNode ||
          !selectedNodes?.toNode ||
          linkWeight === initialLinkWeight
        }
      >
        Update Weight
      </Button>
    </div>
  );
};

export default LinkWeightControls;