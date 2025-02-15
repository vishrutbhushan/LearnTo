import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as ACTIONS from "../actions";
import { State } from "../types";

const DijkstraAlgorithm = () => {
  const adjacencyMatrix = useSelector((state: State) => state.adjacencyMatrix);
  const selectedNodes = useSelector((state: State) => state.selectedNodes);
  const allNodes = useSelector((state: State) => state.allNodes);
  const dispatch = useDispatch();

  const DijkstraAlgorithm = () => {
    const fromNode = selectedNodes.fromNode !== null ? allNodes[selectedNodes.fromNode] : null;
    const toNode = selectedNodes.toNode !== null ? allNodes[selectedNodes.toNode] : null;
    if (fromNode === null || toNode === null) {
      console.error("Please select a source and destination node");
      return;
    }
    runDijkstraAlgorithm(fromNode, toNode);
  };

  const runDijkstraAlgorithm = (fromNode: any, toNode: any) => {
    const nodes = Object.keys(allNodes);
    const distances: { [key: string]: number } = {};
    const previousNodes: { [key: string]: string | null } = {};
    nodes.forEach((node) => {
      distances[node] = Infinity;
      previousNodes[node] = null;
    });
    distances[fromNode] = 0;
    const unvisitedNodes = [...nodes];
    while (unvisitedNodes.length > 0) {
      const currentNode = getClosestNode(unvisitedNodes, distances);
      unvisitedNodes.splice(unvisitedNodes.indexOf(currentNode), 1);
      dispatch(ACTIONS.highlightNode(currentNode, true)); // Highlight current node
      const neighbors = getNeighbors(currentNode);
      neighbors.forEach((neighbor) => {
        const distance = distances[currentNode] + getDistance(currentNode, neighbor);
        if (distance < distances[neighbor]) {
          distances[neighbor] = distance;
          previousNodes[neighbor] = currentNode;
          dispatch(ACTIONS.highlightLink(currentNode, neighbor, true)); // Highlight link
        }
      });
    }
    const path = getPath(previousNodes, toNode);
    console.log("Path:", path);
  };

  const getClosestNode = (unvisitedNodes: string[], distances: { [key: string]: number }) => {
    return unvisitedNodes.reduce((closestNode, node) => {
      if (closestNode === "" || distances[node] < distances[closestNode]) {
        return node;
      }
      return closestNode;
    }, "");
  };

  const getNeighbors = (node: string) => {
    const nodeIndex = allNodes[node].index;
    return adjacencyMatrix[nodeIndex]
      .map((link: any, index: number) => (link.weight > 0 ? Object.keys(allNodes)[index] : null))
      .filter((neighbor: string | null) => neighbor !== null);
  };

  const getDistance = (fromNode: string, toNode: string) => {
    const fromNodeIndex = allNodes[fromNode].index;
    const toNodeIndex = allNodes[toNode].index;
    return adjacencyMatrix[fromNodeIndex][toNodeIndex].weight;
  };

  const getPath = (previousNodes: { [key: string]: string | null }, toNode: string) => {
    const path = [];
    let currentNode : string | null = toNode;
    while (currentNode !== null) {
      path.unshift(currentNode);
      currentNode = previousNodes[currentNode];
    }
    return path;
  };

  return (
    <div>
      <button onClick={DijkstraAlgorithm}>Run Dijkstra Algorithm</button>
    </div>
  );
};

export default DijkstraAlgorithm;