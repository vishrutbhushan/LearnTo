// Define the shape of the state
export interface State {
  adjacencyMatrix: { weight: number; highlighted: boolean }[][];
  allNodes: {
    [key: string]: {
      index: number;
      x: number;
      y: number;
      highlighted: boolean;
    };
  };
  selectedNodes: { fromNode: string | null; toNode: string | null };
  savedGraphs: { id: number; name: string; desc: string }[];
  displayNotification: string;
}

// Define the shape of an action
export interface Action {
  type: string;
  payload: any;
}

export interface Node {
  x: number;
  y: number;
  index: number;
}

export interface NodeComponentProps {
  name: string;
  node: Node;
}

export interface InsertNodePayload {
  nodeName: string;
}

export interface RemoveNodePayload {
  nodeName: string;
}

export interface UpdateWeightPayload {
  fromNodeName: string;
  toNodeName: string;
  weight: number;
}

export interface SelectNodePayload {
  fromNode: string | null;
  toNode: string | null;
}

export interface Graph {
  name: string;
  description: string;
  adjacencyMatrix: { weight: number; highlighted: boolean }[][];
  allNodes: {
    [key: string]: {
      index: number;
      x: number;
      y: number;
      highlighted: boolean;
    };
  };
}

export interface LinkWeightControlsProps {
  linkWeight: number;
  setLinkWeight: React.Dispatch<React.SetStateAction<number>>;
  handleUpdateWeight: () => void;
  initialLinkWeight: number;
  selectedNodes: { fromNode: string | null; toNode: string | null } | null;
}

export interface NodeComponentToolbarProps {
  name: string;
}

export interface SelectedNodesInfoProps {
  selectedNodes: { fromNode: string | null; toNode: string | null } | null;
}

export interface NodeControlsProps {
  nodeName: string;
  setNodeName: React.Dispatch<React.SetStateAction<string>>;
  handleAddNode: () => void;
}
