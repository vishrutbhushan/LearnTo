import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as ACTIONS from "../actions";
import { State } from "../types";

const Algorithm = () => {
  const adjacencyMatrix = useSelector((state: State) => state.adjacencyMatrix);
  const selectedNodes = useSelector((state: State) => state.selectedNodes);
  const allNodes = useSelector((state: State) => state.allNodes);
  const dispatch = useDispatch();

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const resetHighlights = () => {
    Object.keys(allNodes).forEach((fromNodeName) => {
      Object.keys(allNodes).forEach((toNodeName) => {
        if (fromNodeName !== toNodeName) {
          dispatch(ACTIONS.highlightLink(fromNodeName, toNodeName, false));
        }
      });
    });
  };
  

  const highlightFinalPath = (path: number[]) => {
    resetHighlights();
    for (let i = 0; i < path.length - 1; i++) {
      const fromNodeName = Object.keys(allNodes).find(
        (key) => allNodes[key].index === path[i]
      );
      const toNodeName = Object.keys(allNodes).find(
        (key) => allNodes[key].index === path[i + 1]
      );
      if (fromNodeName && toNodeName) {
        dispatch(ACTIONS.highlightLink(fromNodeName, toNodeName, true));
      }
    }
  };

  const BFSAlgorithm = async () => {
    const fromNode =
      selectedNodes.fromNode !== null ? allNodes[selectedNodes.fromNode] : null;
    const toNode =
      selectedNodes.toNode !== null ? allNodes[selectedNodes.toNode] : null;

    if (!fromNode || !toNode) {
      console.error("Please select a source and destination node");
      return;
    }
    const queue = [fromNode];
    const visited = new Set<number>();
    const parentMap = new Map<number, number>();

    visited.add(fromNode.index);

    while (queue.length > 0) {
      const currentNode = queue.shift();
      if (currentNode && currentNode.index === toNode.index) {
        const path = [];
        let node = toNode.index;
        while (node !== fromNode.index) {
          path.push(node);
          node = parentMap.get(node)!;
        }
        path.push(fromNode.index);
        path.reverse();
        console.log("Path:", path);
        highlightFinalPath(path);
        return;
      }

      if (!currentNode) continue;

      for (let i = 0; i < adjacencyMatrix[currentNode.index].length; i++) {
        if (
          adjacencyMatrix[currentNode.index][i].weight > 0 &&
          !visited.has(i)
        ) {
          const fromNodeName = Object.keys(allNodes).find(
            (key) => allNodes[key].index === currentNode.index
          );
          const toNodeName = Object.keys(allNodes).find(
            (key) => allNodes[key].index === i
          );
          if (toNodeName) {
            queue.push(allNodes[toNodeName]);
          }
          visited.add(i);
          parentMap.set(i, currentNode.index);
          if (fromNodeName && toNodeName) {
            dispatch(ACTIONS.highlightLink(fromNodeName, toNodeName, true));
          }
          await sleep(500); // Add a delay of 500ms after each visit
        }
      }

      await sleep(500); // Add a delay of 500ms after each visit
    }
  };

  return (
    <div>
      <button onClick={BFSAlgorithm}>Run BFS Algorithm</button>
    </div>
  );
};

export default Algorithm;
