// Define the shape of the state
export interface State {
  adjacencyMatrix: { weight: number; highlighted: boolean }[][];
  allNodes: { [key: string]: { index: number; x: number; y: number; highlighted: boolean } };
  selectedNodes: { fromNode: string | null; toNode: string | null };
}

// Define the shape of an action
export interface Action {
  type: string;
  payload: any;
}