import React from "react";
import { useSelector } from "react-redux";
import { playAreaStyles } from "./styles";
import { State } from "../types";
import NodeComponent from "./NodeComponent";
import LinkComponent from "./LinkComponent";

const PlayArea = () => {
  const adjacencyMatrix = useSelector((state: State) => state.adjacencyMatrix);
  const allNodes = useSelector((state: State) => state.allNodes);
  const classes = playAreaStyles();

  const renderNodes = () => {
    return Object.keys(allNodes).map((key) => (
      <NodeComponent key={key} name={key} node={allNodes[key]} />
    ));
  };

  const renderLinks = () => {
    const links: JSX.Element[] = [];
    const nodeRadius = 25; // Assuming the radius of the node is 25

    Object.keys(allNodes).forEach((sourceKey) => {
      const sourceNode = allNodes[sourceKey];
      Object.keys(allNodes).forEach((targetKey) => {
        const targetNode = allNodes[targetKey];
        const link1 = adjacencyMatrix[sourceNode.index][targetNode.index];
        const link2 = adjacencyMatrix[targetNode.index][sourceNode.index];

        if (
          sourceNode.index < targetNode.index &&
          (link1.weight !== 0 || link2.weight !== 0)
        ) {
          links.push(
            <LinkComponent
              key={`${sourceKey}-${targetKey}`}
              sourceNode={sourceNode}
              targetNode={targetNode}
              link1={link1}
              link2={link2}
              nodeRadius={nodeRadius}
            />
          );
        }
      });
    });

    return links;
  };

  const renderNodesAndLinks = () => (
    <svg className={classes.svg}>
      <defs>
        <marker
          id="arrowEnd"
          markerWidth="10"
          markerHeight="10"
          refX="10"
          refY="5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L10,5 L0,10" fill="none" stroke="black" />
        </marker>
        <marker
          id="arrowStart"
          markerWidth="10"
          markerHeight="10"
          refX="10"
          refY="5"
          orient="auto-start-reverse"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L10,5 L0,10" fill="none" stroke="black" />
        </marker>
        <marker
          id="arrowBidirectionalTop"
          markerWidth="10"
          markerHeight="10"
          refX="10"
          refY="5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L10,5" fill="none" stroke="black" />
        </marker>
        <marker
          id="arrowBidirectionalBottom"
          markerWidth="10"
          markerHeight="10"
          refX="10"
          refY="5"
          orient="auto-start-reverse"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L10,5" fill="none" stroke="black" />
        </marker>
      </defs>
      {renderNodes()}
      {renderLinks()}
    </svg>
  );

  return <div className={classes.container}>{renderNodesAndLinks()}</div>;
};

export default PlayArea;