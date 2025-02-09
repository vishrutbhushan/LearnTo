import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { playAreaStyles } from "./styles";
import * as Actions from "../actions";
import { State } from "../types";
import { JSX } from "react/jsx-runtime";

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
        const weight1 = adjacencyMatrix[sourceNode.index][targetNode.index].weight;
        const weight2 = adjacencyMatrix[targetNode.index][sourceNode.index].weight;

        if (
          sourceNode.index < targetNode.index &&
          (weight1 !== 0 || weight2 !== 0)
        ) {
          const dx = targetNode.x - sourceNode.x;
          const dy = targetNode.y - sourceNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const offsetX = (dx / distance) * nodeRadius;
          const offsetY = (dy / distance) * nodeRadius;

          const x1 = sourceNode.x + offsetX;
          const y1 = sourceNode.y + offsetY;
          const x2 = targetNode.x - offsetX;
          const y2 = targetNode.y - offsetY;

          let markerEnd, markerStart;
          if (weight1 !== 0 && weight2 !== 0) {
            markerEnd = "url(#arrowBidirectionalTop)";
            markerStart = "url(#arrowBidirectionalBottom)";
          } else {
            markerEnd = weight1 !== 0 ? "url(#arrowEnd)" : undefined;
            markerStart = weight2 !== 0 ? "url(#arrowStart)" : undefined;
          }

          links.push(
            <line
              key={`${sourceKey}-${targetKey}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="black"
              markerEnd={markerEnd}
              markerStart={markerStart}
            />
          );

          // Display weights on top and bottom of the line
          const midX = (x1 + x2) / 2;
          const midY = (y1 + y2) / 2;
          const angle = Math.atan2(dy, dx);
          const offset = 10; // Offset for the text from the line

          if (weight1 !== 0) {
            const weight1X = midX + offset * Math.sin(angle);
            const weight1Y = midY - offset * Math.cos(angle);
            links.push(
              <text
                key={`weight1-${sourceKey}-${targetKey}`}
                x={weight1X}
                y={weight1Y}
                fill="black"
                fontSize="12"
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                {weight1}
              </text>
            );
          }

          if (weight2 !== 0) {
            const weight2X = midX - offset * Math.sin(angle);
            const weight2Y = midY + offset * Math.cos(angle);
            links.push(
              <text
                key={`weight2-${sourceKey}-${targetKey}`}
                x={weight2X}
                y={weight2Y}
                fill="black"
                fontSize="12"
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                {weight2}
              </text>
            );
          }
        }
      });
    });

    return links;
  };

  const renderNodesAndLinks = () => (
    <svg width="800" height="600" className={classes.svg}>
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

interface Node {
  x: number;
  y: number;
  index: number;
}

interface NodeComponentProps {
  name: string;
  node: Node;
}

const NodeComponent: React.FC<NodeComponentProps> = ({ name, node }) => {
  const nodeRef = React.useRef<SVGGElement>(null);
  const dispatch = useDispatch();
  const [position, setPosition] = useState({ x: node.x, y: node.y });
  const selectedNodes = useSelector((state: State) => state.selectedNodes);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (
    event: React.MouseEvent<SVGGElement, MouseEvent>
  ) => {
    setIsDragging(false);
    const startX = event.clientX;
    const startY = event.clientY;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      setIsDragging(true);
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      setPosition({ x: node.x + dx, y: node.y + dy });
      dispatch(Actions.updateNodePosition(name, node.x + dx, node.y + dy));
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleClick = () => {
    if (isDragging) return;

    if (selectedNodes.fromNode && selectedNodes.toNode) {
      if (selectedNodes.fromNode === name || selectedNodes.toNode === name) {
        if (selectedNodes.fromNode === name) {
          dispatch(Actions.setSelectedNode(selectedNodes.toNode, null));
        } else {
          dispatch(Actions.setSelectedNode(selectedNodes.fromNode, null));
        }
      } else {
        window.alert("2 nodes already selected");
      }
    } else if (selectedNodes.fromNode && !selectedNodes.toNode) {
      if (selectedNodes.fromNode !== name) {
        dispatch(Actions.setSelectedNode(selectedNodes.fromNode, name));
      } else {
        dispatch(Actions.setSelectedNode(null, null));
      }
    } else if (!selectedNodes.fromNode && !selectedNodes.toNode) {
      dispatch(Actions.setSelectedNode(name, null));
    } else if (selectedNodes.fromNode === name) {
      dispatch(Actions.setSelectedNode(selectedNodes.toNode, null));
    }
  };

  return (
    <g
      ref={nodeRef}
      transform={`translate(${position.x},${position.y})`}
      onMouseDown={(event) => {
        handleMouseDown(event);
      }}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <circle
        r="25"
        fill={
          name === selectedNodes.fromNode || name === selectedNodes.toNode
            ? "red"
            : "lightgreen"
        }
      />
      <text x="0" y="0" textAnchor="middle" alignmentBaseline="middle">
        {name}
      </text>
    </g>
  );
};

export default PlayArea;
