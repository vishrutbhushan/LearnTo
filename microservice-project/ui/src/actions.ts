import * as CONSTANTS from "./constants";
import {
  InsertNodePayload,
  RemoveNodePayload,
  UpdateWeightPayload,
  SelectNodePayload,
  Graph,
} from "./types";

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
export const setSelectedNode = (
  fromNode: string | null,
  toNode: string | null
) => {
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

// Action to set all graphs
export const setSavedGraphs = (
  graphs: { id: number; name: string; desc: string }[]
) => {
  return {
    type: CONSTANTS.SET_SAVED_GRAPHS,
    payload: { savedGraphs: graphs },
  };
};

// Action to fetch all graphs
export const fetchGraphs = () => {
  return {
    type: CONSTANTS.FETCH_GRAPHS_REQUEST,
  };
};

// Action to fetch a graph
export const fetchGraph = (name: string) => {
  return {
    type: CONSTANTS.FETCH_GRAPH_REQUEST,
    payload: name,
  };
};

// Action to create a graph
export const createGraph = (graph: Graph) => {
  return {
    type: CONSTANTS.CREATE_GRAPH_REQUEST,
    payload: graph,
  };
};

// Action to update a graph
export const updateGraph = (id: number, graph: Graph) => {
  return {
    type: CONSTANTS.UPDATE_GRAPH_REQUEST,
    payload: { id, graph },
  };
};

// Action to delete a graph
export const deleteGraph = (id: number) => {
  return {
    type: CONSTANTS.DELETE_GRAPH_REQUEST,
    payload: id,
  };
};

// Action to display a notification
export const displayNotification = (message: string) => {
  return {
    type: CONSTANTS.DISPLAY_NOTIFICATION,
    payload: message,
  };
};

// Action to open saved graph
export const openSavedGraph = (id: number) => {
  return {
    type: CONSTANTS.OPEN_SAVED_GRAPH,
    payload: id,
  };
};
