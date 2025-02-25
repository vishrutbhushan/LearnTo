import React from "react";
import { Node } from "../types";

interface LinkComponentProps {
  sourceNode: Node;
  targetNode: Node;
  link1: {
    weight: number;
    highlighted: boolean;
  };
  link2: {
    weight: number;
    highlighted: boolean;
  };
  nodeRadius: number;
}

const LinkComponent: React.FC<LinkComponentProps> = ({
  sourceNode,
  targetNode,
  link1,
  link2,
  nodeRadius,
}) => {
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
  if (link1.weight !== 0 && link2.weight !== 0) {
    markerEnd = "url(#arrowBidirectionalTop)";
    markerStart = "url(#arrowBidirectionalBottom)";
  } else {
    markerEnd = link1.weight !== 0 ? "url(#arrowEnd)" : undefined;
    markerStart = link2.weight !== 0 ? "url(#arrowStart)" : undefined;
  }

  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const angle = Math.atan2(dy, dx);
  const offset = 10; // Offset for the text from the line

  return (
    <>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke= {link1.highlighted || link2.highlighted ? "red":"black"}
        markerEnd={markerEnd}
        markerStart={markerStart}
      />
      {link1.weight !== 0 && (
        <text
          x={midX + offset * Math.sin(angle)}
          y={midY - offset * Math.cos(angle)}
          fill="black"
          fontSize="12"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {link1.weight}
        </text>
      )}
      {link2.weight !== 0 && (
        <text
          x={midX - offset * Math.sin(angle)}
          y={midY + offset * Math.cos(angle)}
          fill="black"
          fontSize="12"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {link2.weight}
        </text>
      )}
    </>
  );
};

export default LinkComponent;