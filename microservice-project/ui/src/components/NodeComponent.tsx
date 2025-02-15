import React, { useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "../actions";
import { State, NodeComponentProps } from "../types";

const NodeComponent: React.FC<NodeComponentProps> = React.memo(({ name, node }) => {
  const nodeRef = useRef<SVGGElement>(null);
  const dispatch = useDispatch();
  const selectedNodes = useSelector((state: State) => state.selectedNodes);
  const isDragging = useRef(false);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<SVGGElement, MouseEvent>) => {
      event.stopPropagation();
      isDragging.current = false;
      const startX = event.clientX;
      const startY = event.clientY;
  
      const handleMouseMove = (moveEvent: MouseEvent) => {
        isDragging.current = true;
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;
        nodeRef.current?.setAttribute(
          "transform",
          `translate(${node.x + dx},${node.y + dy})`
        );
      };
  
      const handleMouseUp = (moveEvent: MouseEvent) => {
        moveEvent.stopPropagation();
        moveEvent.preventDefault();
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        if (isDragging.current) {
          setTimeout(() => {
            isDragging.current = false;
          }, 0);
          const transform = nodeRef.current?.getAttribute("transform");
          if (transform) {
            const regex = /translate\(([^,]+),([^)]+)\)/;
            const match = regex.exec(transform);
            if (match) {
              const newX = parseFloat(match[1]);
              const newY = parseFloat(match[2]);
              dispatch(Actions.updateNodePosition(name, newX, newY));
            }
          }
        }
      };
  
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [dispatch, name, node.x, node.y]
  );

  const handleClick = useCallback((event: React.MouseEvent<SVGGElement, MouseEvent>) => {
    if (isDragging.current) {
      return;
    }
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
  }, [dispatch, name, selectedNodes]);

  return (
    <g
      ref={nodeRef}
      transform={`translate(${node.x},${node.y})`}
      onMouseDown={handleMouseDown}
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
});

export default NodeComponent;