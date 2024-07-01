"use client";
import React, { useState, useEffect } from "react";
import { MapInteractionCSS } from "react-map-interaction";
import Node from "../ui/node";
import coordinate_5 from "./../../../public/data/5_nodes/coordinate_5.json";
import t5_data from "./../../../public/data/5_nodes/t5_data.json";
import Line from "../ui/line";

function getCoordinatesByNode(node: number) {
  const nodeData = coordinate_5.coordinate_05_01_data.find(
    (item) => item.node === node
  );
  if (nodeData) {
    return { x: nodeData.x, y: nodeData.y };
  }
  return null;
}

const lines = t5_data.coordinate_05_01_data.reduce<
  { x1: number; y1: number; x2: number; y2: number }[]
>((lines, link) => {
  const node1Coordinates = getCoordinatesByNode(link.x);
  const node2Coordinates = getCoordinatesByNode(link.y);

  if (node1Coordinates && node2Coordinates) {
    const { x: x1, y: y1 } = node1Coordinates;
    const { x: x2, y: y2 } = node2Coordinates;

    lines.push({ x1, y1, x2, y2 });
  }

  return lines;
}, []);

interface Point {
  x: number;
  y: number;
}

interface Circle {
  cx: number;
  cy: number;
  r: number;
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
  const [mapState, setMapState] = useState({
    scale: 0.8,
    translation: { x: 0, y: 0 },
  });

  const renderLines = () => {
    if (hoveredNode === null) return null;
    const filteredLines = lines.filter((line) => {
      return (
        line.x1 === getCoordinatesByNode(hoveredNode)?.x &&
        line.y1 === getCoordinatesByNode(hoveredNode)?.y
      );
    });

    return (
      <div>
        {filteredLines.map((p, i) => {
          const radius = 15;
          const center1 = { cx: p.x1, cy: p.y1, r: radius };
          const center2 = { cx: p.x2, cy: p.y2, r: radius };
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
              from={{ x: p.x2, y: p.y2 }}
              style={"2px dashed"}
              className="text-accent"
            />
          );
        })}
      </div>
    );
    // return (
    //     <div>
    //         {
    //             lines.map((p, i) => <Line
    //                 key={i}
    //                 from={{ x: p.x1 + 15, y: p.y1 + 12 }}
    //                 to={{ x: p.x2 + 15, y: p.y2 + 12 }}
    //                 style={"2px solid blue"}
    //             />)
    //         }
    //     </div>
    // );
  };

  const renderBoardPiece = () => {
    return coordinate_5.coordinate_05_01_data.map((nodeList, index) => (
      <Node
        key={`node-${index}`}
        x={nodeList.x}
        y={nodeList.y}
        onMouseEnter={() => setHoveredNode(nodeList.node)}
        onMouseLeave={() => setHoveredNode(null)}
      >
        {nodeList.node}{" "}
      </Node>
    ));
  };

  return (
    <div className="w-full h-[800px] bg-white">
      <MapInteractionCSS
        value={mapState}
        onChange={(value) => setMapState(value)}
      >
        {renderLines()}
        {renderBoardPiece()}
      </MapInteractionCSS>
    </div>
  );
}
