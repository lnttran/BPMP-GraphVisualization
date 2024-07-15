"use client";
import React, { useState, useEffect } from "react";
import { MapInteractionCSS } from "react-map-interaction";
import Node from "../ui/node";
import coordinate_5 from "../../../public/data/5_nodes/coordinate_5.json";
import t5_data from "../../../public/data/5_nodes/t5_data.json";
import Line from "../ui/line";
import { node } from "prop-types";
import { useRouteContext } from "../context/RouteContext";
import NoteBox from "../ui/noteBox";
import CollapsableSheet from "../collapsableSheet/CollapsableSheet";
import { useCargoContext } from "../context/CargoContext";

const dataSize = coordinate_5.coordinate_05_01_data.length;

function getCoordinatesByNode(node: number) {
  const nodeData = coordinate_5.coordinate_05_01_data.find(
    (item) => item.node === node
  );
  if (nodeData) {
    return { x: nodeData.x, y: nodeData.y };
  }

  throw new Error("Invalid coordinate");
}

function getWeightDistantbyPickupDropoff(
  pickup: number,
  dropoff: number
): { w: number; d: number } {
  const foundData = t5_data.coordinate_05_01_data.find(
    (data) => data.x === pickup && data.y === dropoff
  );
  if (foundData === undefined) {
    throw new Error(
      `No data found for pickup ${pickup} and dropoff ${dropoff}`
    );
  }
  return { w: foundData.w, d: foundData.d };
}

function getLineType(line: {
  w: number;
  d: number;
  from?: number;
  to?: number;
  selectedRoute?: number[];
}): {
  style: string;
  color: string;
} {
  const { from, to, selectedRoute } = line;
  if (
    selectedRoute &&
    selectedRoute.length > 1 &&
    from !== undefined &&
    to !== undefined
  ) {
    // Check if there exists a segment in selectedRoute matching from -> to
    return { style: "solid", color: "text-accent" };
  } else if (line.w === 0.0) {
    return { style: "dashed", color: "text-red-500" };
  } else {
    return { style: "dashed", color: "text-accent" };
  }
}

const lines = t5_data.coordinate_05_01_data.reduce<
  {
    from: number;
    to: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    w: number;
    d: number;
    style: string;
    color: string;
  }[]
>((lines, link) => {
  const node1Coordinates = getCoordinatesByNode(link.x);
  const node2Coordinates = getCoordinatesByNode(link.y);
  const w = link.w;
  const d = link.d;

  const { style: style, color: color } = getLineType({ w: w, d: d });

  if (node1Coordinates && node2Coordinates) {
    const { x: x1, y: y1 } = node1Coordinates;
    const { x: x2, y: y2 } = node2Coordinates;

    lines.push({
      x1,
      y1,
      x2,
      y2,
      w,
      d,
      style,
      color,
      from: link.x,
      to: link.y,
    });
  }

  return lines;
}, []);

interface Point {
  x: number;
  y: number;
}

function calculateSnapPoints(
  cx: number,
  cy: number,
  r: number,
  numPoints: number
): Point[] {
  const points: Point[] = [];
  for (let i = 0; i < numPoints; i++) {
    const angle = ((2 * Math.PI) / numPoints) * i;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    points.push({ x, y });
  }
  return points;
}

function calculateAngle(
  cx1: number,
  cy1: number,
  cx2: number,
  cy2: number
): number {
  return Math.atan2(cy2 - cy1, cx2 - cx1);
}

function findClosestSnapPoint(
  angle: number,
  snapPoints: Point[],
  cx: number,
  cy: number
): Point {
  let minDist = Infinity;
  let closestPoint: Point | null = null;
  snapPoints.forEach((point) => {
    const snapAngle = Math.atan2(point.y - cy, point.x - cx);
    const dist = Math.abs(snapAngle - angle);
    if (dist < minDist) {
      minDist = dist;
      closestPoint = point;
    }
  });
  if (closestPoint === null) {
    throw new Error("No closest point found");
  }
  return closestPoint;
}

export default function GraphVisualiser() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const { selectedRoute, setSelectedRoute } = useRouteContext();
  const { selectedCargo, setSelectedCargo } = useCargoContext();
  const [noteContent, setNoteContent] = useState("");
  const [mapState, setMapState] = useState({
    scale: 0.8,
    translation: { x: 0, y: 0 },
  });

  const handleOnClickedNode = (isSelected: boolean, i: number) => {
    if (i == 0) {
      return;
    }
    if (!isSelected) {
      //add the node to selected route
      const lastElement = selectedRoute[selectedRoute.length - 1];
      setSelectedRoute((prevRoute) => [...prevRoute, i]);
      // Get the previous last element before adding i

      const { w, d } = getWeightDistantbyPickupDropoff(lastElement, i);

      //add the node to the selected cargo by default
      setSelectedCargo((prevCargo) => [
        ...prevCargo,
        {
          pickup: lastElement,
          dropoff: i,
          w: w,
          d: d,
        },
      ]);
    } else {
      let indexToRemove: number = selectedRoute.indexOf(i);
      if (indexToRemove !== -1) {
        setSelectedRoute((prevRoute) => {
          const newRoute = [...prevRoute];
          newRoute.splice(indexToRemove);
          return newRoute;
        });

        setSelectedCargo((prevCargo) => {
          const lastElement = selectedRoute[indexToRemove - 1];
          return prevCargo.filter(
            (cargo) => !(cargo.pickup === lastElement && cargo.dropoff === i)
          );
        });
      }
    }
  };

  const renderRoute = () => {
    let filteredLines: {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      w: number;
      d: number;
      color: string;
      style: string;
      from: number;
      to: number;
    }[] = [];

    const selectedRouteLength = selectedRoute.length;

    // Iterate through selectedRoute
    for (let i = 0; i < selectedRouteLength; i++) {
      if (i < selectedRouteLength - 1) {
        const startNode = selectedRoute[i];
        const endNode = selectedRoute[i + 1];
        let lineType: { color: string; style: string } = {
          color: "",
          style: "",
        };

        // Find lines connecting current node to the next node
        const matchingLines = lines.filter((line) => {
          lineType = getLineType({
            w: line.w,
            d: line.d,
            from: startNode,
            to: endNode,
            selectedRoute: selectedRoute,
          });
          return (
            line.x1 === getCoordinatesByNode(startNode).x &&
            line.y1 === getCoordinatesByNode(startNode).y &&
            line.x2 === getCoordinatesByNode(endNode).x &&
            line.y2 === getCoordinatesByNode(endNode).y &&
            line.from === startNode &&
            line.to === endNode
          );
        })[0];

        filteredLines.push({
          ...matchingLines,
          color: lineType.color,
          style: lineType.style,
        });
      } else {
        // Last element logic: Connect to remaining nodes not in selectedRoute
        const lastNode = selectedRoute[i];

        const remainingNodes: number[] = [];
        for (let j = 2; j <= dataSize; j++) {
          if (!selectedRoute.includes(j)) {
            remainingNodes.push(j);
          }
        }

        const matchingLines = lines.filter((line) =>
          remainingNodes.some((node) => {
            return (
              line.x1 === getCoordinatesByNode(lastNode)?.x &&
              line.y1 === getCoordinatesByNode(lastNode)?.y &&
              line.x2 === getCoordinatesByNode(node)?.x &&
              line.y2 === getCoordinatesByNode(node)?.y &&
              line.from === lastNode &&
              line.to === node
            );
          })
        );

        filteredLines.push(...matchingLines);
      }
    }

    return renderLines(filteredLines);
  };

  const renderHoverLines = () => {
    if (hoveredNode === null) return null;
    const remainingNodes: number[] = [];
    for (let j = 2; j <= dataSize; j++) {
      if (!selectedRoute.includes(j)) {
        remainingNodes.push(j);
      }
    }
    const filteredLines = lines.filter((line) =>
      remainingNodes.some((node) => {
        return (
          line.x1 === getCoordinatesByNode(hoveredNode)?.x &&
          line.y1 === getCoordinatesByNode(hoveredNode)?.y &&
          line.x2 === getCoordinatesByNode(node)?.x &&
          line.y2 === getCoordinatesByNode(node)?.y &&
          line.from === hoveredNode &&
          line.to === node
        );
      })
    );
    return renderLines(filteredLines);
  };

  const handleLineMouseEnter = (
    from: number,
    to: number,
    w: number,
    d: number
  ) => {
    setNoteContent(`From: ${from}\nTo: ${to}\nW: ${w}\nD: ${d}`);
  };

  const handleLineMouseLeave = () => {
    setNoteContent("");
  };

  const renderLines = (
    lineList: {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      w: number;
      d: number;
      style: string;
      color: string;
      from: number;
      to: number;
    }[]
  ) => {
    return (
      <div>
        {lineList.map((line, i) => {
          const radius = 15;
          const center1 = { cx: line.x1, cy: line.y1, r: radius };
          const center2 = { cx: line.x2, cy: line.y2, r: radius };
          const numSnapPoints = 10;

          const snapPoints1: Point[] = calculateSnapPoints(
            center1.cx,
            center1.cy,
            center1.r,
            numSnapPoints
          );

          const angle: number = calculateAngle(
            center1.cx,
            center1.cy,
            center2.cx,
            center2.cy
          );
          const closestPoint1: Point = findClosestSnapPoint(
            angle,
            snapPoints1,
            center1.cx,
            center1.cy
          );

          return (
            <Line
              key={i}
              to={{ x: closestPoint1.x, y: closestPoint1.y }}
              from={{ x: line.x2, y: line.y2 }}
              style={`${line.style}`}
              className={line.color}
              onMouseEnter={() =>
                handleLineMouseEnter(line.from, line.to, line.w, line.d)
              }
              onMouseLeave={handleLineMouseLeave}
            />
          );
        })}
      </div>
    );
  };

  const renderBoardPiece = () => {
    return coordinate_5.coordinate_05_01_data.map((nodeList, index) => (
      <Node
        key={`node-${index}`}
        x={nodeList.x}
        y={nodeList.y}
        onMouseEnter={() => setHoveredNode(nodeList.node)}
        onMouseLeave={() => setHoveredNode(null)}
        onClickedDefault={index === 0}
        onClick={(isSelected: boolean) =>
          handleOnClickedNode(isSelected, index + 1)
        }
      >
        {nodeList.node}{" "}
      </Node>
    ));
  };

  return (
    <div className="max-w-full h-[830px] bg-popover rounded-xl relative">
      <MapInteractionCSS
        value={mapState}
        onChange={(value) => setMapState(value)}
      >
        {renderHoverLines()}
        {renderRoute()}
        {renderBoardPiece()}
      </MapInteractionCSS>
      <NoteBox isVisible={true}>{noteContent}</NoteBox>
      <CollapsableSheet />
    </div>
  );
}
