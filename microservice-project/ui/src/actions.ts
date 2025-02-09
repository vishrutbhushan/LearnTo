import * as CONSTANTS from "./constants";

// Define types for the action payloads
interface InsertNodePayload {
  nodeName: string;
}

interface RemoveNodePayload {
  nodeName: string;
}

interface UpdateWeightPayload {
  fromNodeName: string;
  toNodeName: string;
  weight: number;
}

interface SelectNodePayload {
  fromNode: string | null;
  toNode: string | null;
}

// Action to insert a node
export const insertNode = (nodeName: string) => {
  const payload: InsertNodePayload = { nodeName };
  return {
    type: CONSTANTS.INSERT_NODE,
    payload,
  };
};

// Action to remove a node
export const removeNode = (nodeName: string) => {
  const payload: RemoveNodePayload = { nodeName };
  return {
    type: CONSTANTS.REMOVE_NODE,
    payload,
  };
};

// Action to update the weight of a link between two nodes
export const updateWeight = (
  fromNodeName: string,
  toNodeName: string,
  weight: number
) => {
  const payload: UpdateWeightPayload = { fromNodeName, toNodeName, weight };
  return {
    type: CONSTANTS.UPDATE_WEIGHT,
    payload,
  };
};

// Action to reset the state
export const reset = () => ({
  type: CONSTANTS.RESET,
});

// Action to select a node
export const setSelectedNode = (fromNode: string | null, toNode: string | null) => {
  const payload: SelectNodePayload = { fromNode, toNode };
  return {
    type: CONSTANTS.SET_SELECT_NODE,
    payload,
  };
};

// Action to update the position of a node
export const updateNodePosition = (nodeName: string, x: number, y: number) => {
  const payload = { nodeName, x, y };
  return {
    type: CONSTANTS.UPDATE_NODE_POSITION,
    payload,
  };
};

// Action to highlight/unhighlight a link
export const highlightLink = (
  fromNodeName: string,
  toNodeName: string,
  highlighted: boolean
) => {
  const payload = { fromNodeName, toNodeName, highlighted };
  return {
    type: CONSTANTS.SET_HIGHLIGHT_LINK,
    payload,
  };
};

// Action to highlight/unhighlight a node
export const highlightNode = (nodeName: string, highlighted: boolean) => {
  const payload = { nodeName, highlighted };
  return {
    type: CONSTANTS.SET_HIGHLIGHT_NODE,
    payload,
  };
};