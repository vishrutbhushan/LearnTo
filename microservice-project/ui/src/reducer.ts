import produce, { Draft } from "immer";
import * as CONSTANTS from "./constants";
import { Action, State } from "./types";

// Initial state of the reducer
export const initialState: State = {
  adjacencyMatrix: [],
  allNodes: {},
  selectedNodes: { fromNode: null, toNode: null },
  savedGraphs: [],
  displayNotification: "",
};

// Function to insert a new node into the state
const insertNode = (draft: Draft<State>, payload: { nodeName: string }) => {
  const { nodeName } = payload;
  const newNodeIndex = draft.adjacencyMatrix.length;
  draft.allNodes[nodeName] = {
    index: newNodeIndex,
    x: 100,
    y: 100,
    highlighted: false,
  }; // Default position
  draft.adjacencyMatrix.push(
    Array(newNodeIndex + 1).fill({ weight: 0, highlighted: false })
  );
  draft.adjacencyMatrix.forEach(
    (row: { weight: number; highlighted: boolean }[]) =>
      row.push({ weight: 0, highlighted: false })
  );
};

// Helper function to update node indices
const updateNodeIndices = (draft: Draft<State>, nodeIndex: number) => {
  Object.keys(draft.allNodes).forEach((key) => {
    if (draft.allNodes[key].index > nodeIndex) {
      draft.allNodes[key].index -= 1;
    }
  });
};

// Function to remove a node from the state
const removeNode = (draft: Draft<State>, payload: { nodeName: string }) => {
  const { nodeName } = payload;
  const nodeIndex = draft.allNodes[nodeName]?.index;
  // Remove the node from selectedNodes if it is present
  if (draft.selectedNodes.fromNode === nodeName) {
    draft.selectedNodes.fromNode = draft.selectedNodes.toNode ?? null;
  }
  if (draft.selectedNodes.toNode === nodeName) {
    draft.selectedNodes.toNode = null;
  }
  delete draft.allNodes[nodeName];
  draft.adjacencyMatrix.splice(nodeIndex, 1);
  draft.adjacencyMatrix.forEach(
    (row: { weight: number; highlighted: boolean }[]) =>
      row.splice(nodeIndex, 1)
  );
  updateNodeIndices(draft, nodeIndex);
};

// Function to update the weight of a link between two nodes
const updateWeight = (
  draft: Draft<State>,
  payload: { fromNodeName: string; toNodeName: string; weight: number }
) => {
  const { fromNodeName, toNodeName, weight } = payload;
  const fromNodeIndex = draft.allNodes[fromNodeName]?.index;
  const toNodeIndex = draft.allNodes[toNodeName]?.index;
  draft.adjacencyMatrix[fromNodeIndex][toNodeIndex].weight = weight;
};

// Function to highlight/unhighlight a link
const setHighlightLink = (
  draft: Draft<State>,
  payload: { fromNodeName: string; toNodeName: string; highlighted: boolean }
) => {
  const { fromNodeName, toNodeName, highlighted } = payload;
  const fromNodeIndex = draft.allNodes[fromNodeName]?.index;
  const toNodeIndex = draft.allNodes[toNodeName]?.index;
  draft.adjacencyMatrix[fromNodeIndex][toNodeIndex].highlighted = highlighted;
};

// Function to highlight/unhighlight a node
const setHighlightNode = (
  draft: Draft<State>,
  payload: { nodeName: string; highlighted: boolean }
) => {
  const { nodeName, highlighted } = payload;
  const node = draft.allNodes[nodeName];
  node.highlighted = highlighted;
};

// Function to select/deselect a node
const setSelectNode = (
  draft: Draft<State>,
  payload: { fromNode: string; toNode: string }
) => {
  const { fromNode, toNode } = payload;
  draft.selectedNodes = { fromNode, toNode };
};

// Function to update the position of a node
const updateNodePosition = (
  draft: Draft<State>,
  payload: { nodeName: string; x: number; y: number }
) => {
  const { nodeName, x, y } = payload;
  const node = draft.allNodes[nodeName];
  node.x = x;
  node.y = y;
};

// Function to set the saved graphs
const setSavedGraphs = (
  draft: Draft<State>,
  payload: { savedGraphs: { id: number; name: string; desc: string }[] }
) => {
  draft.savedGraphs = payload.savedGraphs;
};

// Function to set the opened graph
const setOpenedGraph = (
  draft: Draft<State>,
  payload: { adjacencyMatrix: { weight: number; highlighted: boolean }[][]; allNodes: { [key: string]: { index: number; x: number; y: number; highlighted: boolean } } }
) => {
  draft.adjacencyMatrix = payload.adjacencyMatrix;
  draft.allNodes = payload.allNodes;
};

// The main reducer function
export const reducer = produce((draft: Draft<State>, action: Action) => {
  console.log(`Action dispatched: ${action.type}`, action.payload);
  switch (action.type) {
    case CONSTANTS.INSERT_NODE:
      insertNode(draft, action.payload);
      break;
    case CONSTANTS.REMOVE_NODE:
      removeNode(draft, action.payload);
      break;
    case CONSTANTS.UPDATE_WEIGHT:
      updateWeight(draft, action.payload);
      break;
    case CONSTANTS.SET_SELECT_NODE:
      setSelectNode(draft, action.payload);
      break;
    case CONSTANTS.UPDATE_NODE_POSITION:
      updateNodePosition(draft, action.payload);
      break;
    case CONSTANTS.SET_HIGHLIGHT_LINK:
      setHighlightLink(draft, action.payload);
      break;
    case CONSTANTS.SET_HIGHLIGHT_NODE:
      setHighlightNode(draft, action.payload);
      break;
    case CONSTANTS.RESET:
      return { ...initialState, savedGraphs: draft.savedGraphs };
    case CONSTANTS.SET_SAVED_GRAPHS:
      setSavedGraphs(draft, action.payload);
      break;
    case CONSTANTS.OPEN_SAVED_GRAPH:
      setOpenedGraph(draft, action.payload);
      break;
    default:
      console.warn(`Unhandled action type: ${action.type}`);
      break;
  }
}, initialState);

export default reducer;
