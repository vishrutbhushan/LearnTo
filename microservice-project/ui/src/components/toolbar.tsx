import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import * as ACTIONS from "../actions";
import { toolbarStyles } from "./styles";
import { State, NodeControlsProps, SelectedNodesInfoProps, LinkWeightControlsProps, NodeComponentToolbarProps } from "../types";

const Toolbar = () => {
  const adjacencyMatrix = useSelector((state: State) => state.adjacencyMatrix);
  const selectedNodes = useSelector((state: State) => state.selectedNodes);
  const allNodes = useSelector((state: State) => state.allNodes);
  const savedGraphs = useSelector((state: State) => state.savedGraphs);

  const dispatch = useDispatch();
  const classes = toolbarStyles();

  const [nodeName, setNodeName] = useState<string>("");
  const [linkWeight, setLinkWeight] = useState(0);
  const [initialLinkWeight, setInitialLinkWeight] = useState(0);
  const [graphName, setGraphName] = useState<string>("");
  const [graphDesc, setGraphDesc] = useState<string>("");
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);

  useEffect(() => {
    if (selectedNodes?.fromNode && selectedNodes?.toNode) {
      const nodeLink =
        adjacencyMatrix[allNodes[selectedNodes.fromNode].index][
          allNodes[selectedNodes.toNode].index
        ] ?? 0;
      setLinkWeight(nodeLink.weight);
      setInitialLinkWeight(nodeLink.weight);
    } else {
      setLinkWeight(0);
      setInitialLinkWeight(0);
    }
  }, [selectedNodes, adjacencyMatrix, allNodes]);

  useEffect(() => {
    dispatch(ACTIONS.fetchGraphs());
  }, [dispatch]);

  const handleAddNode = useCallback(() => {
    try {
      dispatch(ACTIONS.insertNode(nodeName));
      setNodeName("");
    } catch (error) {
      console.error("Failed to add node:", error);
    }
  }, [dispatch, nodeName]);

  const handleRemoveNode = useCallback(() => {
    if (selectedNodes?.fromNode && !selectedNodes?.toNode) {
      try {
        dispatch(ACTIONS.removeNode(selectedNodes.fromNode));
      } catch (error) {
        console.error("Failed to remove node:", error);
      }
    } else {
      console.warn("Please select one node to remove");
    }
  }, [dispatch, selectedNodes]);

  const handleUpdateWeight = useCallback(() => {
    const { fromNode, toNode } = selectedNodes || {};
    if (fromNode && toNode) {
      try {
        dispatch(ACTIONS.updateWeight(fromNode, toNode, linkWeight || 0));
        dispatch(ACTIONS.setSelectedNode(null, null));
        setLinkWeight(0);
        setInitialLinkWeight(0);
      } catch (error) {
        console.error("Failed to update weight:", error);
      }
    }
  }, [dispatch, selectedNodes, linkWeight]);

  const handleReset = useCallback(() => {
    try {
      dispatch(ACTIONS.reset());
      setLinkWeight(0);
      setInitialLinkWeight(0);
    } catch (error) {
      console.error("Failed to reset:", error);
    }
  }, [dispatch]);

  const handleSaveGraph = () => {
    const graph = {
      name: graphName,
      description: graphDesc,
      adjacencyMatrix: adjacencyMatrix,
      allNodes: allNodes,
     };
     dispatch(ACTIONS.createGraph(graph));
     setGraphName("");
     setGraphDesc("");
     setIsSaveDialogOpen(false);
     dispatch(ACTIONS.reset());
  };

  return (
    <div className={classes.toolbar}>
      <NodeControls
        nodeName={nodeName}
        setNodeName={setNodeName}
        handleAddNode={handleAddNode}
      />
      <SelectedNodesInfo selectedNodes={selectedNodes} />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleRemoveNode}
        disabled={!(selectedNodes?.fromNode && !selectedNodes?.toNode)}
        className={classes.button}
      >
        Remove Node
      </Button>
      <LinkWeightControls
        linkWeight={linkWeight}
        setLinkWeight={setLinkWeight}
        handleUpdateWeight={handleUpdateWeight}
        initialLinkWeight={initialLinkWeight}
        selectedNodes={selectedNodes}
      />
      <Button variant="contained" color="secondary" onClick={handleReset}>
        Reset
      </Button>
      <Button variant="contained" color="primary" onClick={() => setIsSaveDialogOpen(true)}>
        Save Graph
      </Button>
      <Dialog open={isSaveDialogOpen} onClose={() => setIsSaveDialogOpen(false)}>
        <DialogTitle>Save Graph</DialogTitle>
        <DialogContent>
          <TextField
            label="Graph Name"
            value={graphName}
            onChange={(e) => setGraphName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Graph Description"
            value={graphDesc}
            onChange={(e) => setGraphDesc(e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsSaveDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveGraph} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Typography variant="h6">Saved Graphs</Typography>
      <List style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', border: '1px solid black' }}>
        {savedGraphs.map((graph) => (
          <ListItem key={graph.name} style={{ border: '1px solid black' }}>
            <ListItemButton onClick={() => dispatch(ACTIONS.fetchGraph(graph.name))}>
              <ListItemText primary={graph.name} secondary={graph.desc} />
            </ListItemButton>
            <Button variant="contained" color="primary" onClick={() => dispatch(ACTIONS.fetchGraph(graph.name))}>
              Load
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

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

export default Toolbar;