"use client";
import React, { useState, useEffect } from "react";
import { MapInteractionCSS } from "react-map-interaction";
import Node from "../ui/node";
import Line from "../ui/line";
import NoteBox from "../ui/noteBox";
import CollapsableSheet from "../collapsableSheet/CollapsableSheet";
import { LineTypeTSP } from "../tools/LineType";
import { Plus, Minus } from "lucide-react";
import { Button } from "../ui/button";
import { useDataTSPContext } from "../context/DataTSPContext";
import { useRouteTSPContext } from "../context/RouteTSPContext";
import {
  calculateAngle,
  calculateSnapPoints,
  findClosestSnapPoint,
  getCoordinatesByNode,
  getWeightDistantbyPickupDropoff,
} from "./GraphVisualizer";
import { Point } from "framer-motion";
import TSPContent from "../collapsableSheet/TSPContent";

type LineInfo = {
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
  display: string;
};

export default function TSPGraphVisualiser({
  filename,
  resetSignal,
  isToggled,
}: {
  filename: string;
  resetSignal: boolean;
  isToggled: boolean;
}) {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const { selectedRoute, addNodeToRoute, deleteNodeToRoute, resetRoute } =
    useRouteTSPContext();
  const [noteContent, setNoteContent] = useState("");
  const [currentLineType, setCurrentLineType] = useState("");
  const { retrievedData } = useDataTSPContext();
  const [mapState, setMapState] = useState({
    scale: 0.5,
    translation: { x: 0, y: 0 },
  });

  const weightDistantData = retrievedData?.data?.weightDistantData || [];
  const coordinateData = retrievedData?.coordinate || [];
  const dataSize = coordinateData.length;

  // TSP: the tour is closed when we have visited every node and returned to 1
  const isTourClosed =
    dataSize > 0 &&
    selectedRoute.length === dataSize + 1 &&
    selectedRoute[selectedRoute.length - 1] === 1;

  useEffect(() => {
    if (filename && (window as any).spButtonControl) {
      (window as any).spButtonControl.setCurrentFile(filename);
    }
    resetRoute();
  }, [filename]);

  useEffect(() => {
    if (selectedRoute.length > 0) {
      checkOptimalPath();
    }
  }, [selectedRoute]);

  // Base lines: every (x, y) record in the data, styled as a default (unselected) edge
  const lines = weightDistantData.reduce<LineInfo[]>((acc, link) => {
    const node1Coordinates = getCoordinatesByNode(link.x, coordinateData);
    const node2Coordinates = getCoordinatesByNode(link.y, coordinateData);
    if (!node1Coordinates || !node2Coordinates) return acc;

    const { style, color, display } = LineTypeTSP({ d: link.d });
    acc.push({
      x1: node1Coordinates.x,
      y1: node1Coordinates.y,
      x2: node2Coordinates.x,
      y2: node2Coordinates.y,
      w: link.w,
      d: link.d,
      style,
      color,
      display,
      from: link.x,
      to: link.y,
    });
    return acc;
  }, []);

  // Direction-independent lookup: a-b or b-a both count
  const findLineBetween = (a: number, b: number) =>
    lines.find(
      (line) =>
        (line.from === a && line.to === b) ||
        (line.from === b && line.to === a)
    );

  // If a and b are consecutive in selectedRoute, return [from, to] in route order.
  // Otherwise return null.
  const getRouteStep = (a: number, b: number): [number, number] | null => {
    for (let i = 0; i < selectedRoute.length - 1; i++) {
      const s = selectedRoute[i];
      const t = selectedRoute[i + 1];
      if ((s === a && t === b) || (s === b && t === a)) return [s, t];
    }
    return null;
  };

  // Restyle a base line as a selected route edge, passing from/to in route order
  const styleAsRouteEdge = (line: LineInfo, from: number, to: number): LineInfo => {
    const lineType = LineTypeTSP({
      d: line.d,
      from,
      to,
      selectedRoute,
      isToggle: isToggled,
    });
    return {
      ...line,
      color: lineType.color,
      style: lineType.style,
      display: lineType.display,
    };
  };

  const getUnvisitedNodes = (): number[] => {
    const remaining: number[] = [];
    for (let j = 2; j <= dataSize; j++) {
      if (!selectedRoute.includes(j)) remaining.push(j);
    }
    return remaining;
  };

  const checkOptimalPath = async () => {
    console.log("=== Checking optimal solution (TSP) ===");
    console.log("Current selectedRoute:", selectedRoute);

    if (isTourClosed) {
      console.log("Tour is complete. Marking as completed.");
      if ((window as any).spButtonControl) {
        (window as any).spButtonControl.setPathCompleted();
      }
    }

    try {
      const response = await fetch(
        `/api/travelingsalesmanproblem/data/optimalSolution?filename=${encodeURIComponent(filename)}`
      );

      if (response.ok) {
        const optimalSolution = await response.json();
        const routes = optimalSolution.content.routes;
        let isMatch = false;

        if (routes && routes.length > 0) {
          const finalRoute = routes[routes.length - 1];
          isMatch = JSON.stringify(selectedRoute) === JSON.stringify(finalRoute);
          console.log("Final route:", finalRoute);
          console.log("Current route:", selectedRoute);
          console.log("Route match:", isMatch);
        }

        if (isMatch) {
          console.log("Found optimal solution!");
          if ((window as any).spButtonControl) {
            (window as any).spButtonControl.setPathCompleted();
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOnClickedNode = (isSelected: boolean, i: number): boolean => {
    const lastElement = selectedRoute[selectedRoute.length - 1];

    // Node 1 is special: it starts the tour and also closes it.
    // Node 1 is already highlighted once it is in the route, so the Node component
    // may report isSelected = false when it is clicked again. Ignore isSelected here.
    if (i === 1) {
      if (isTourClosed) return true;

      // Closing the tour: every other node must already be visited
      if (selectedRoute.length === dataSize) {
        const { d } = getWeightDistantbyPickupDropoff(
          lastElement,
          1,
          weightDistantData
        );
        const { status } = addNodeToRoute(1, d);
        if (status && (window as any).spButtonControl) {
          (window as any).spButtonControl.incrementAttempts();
        }
        return true;
      }

      // Node 1 is the start of the tour and can never be removed.
      // Use Reset to start over.
      return true;
    }

    if (isSelected) {
      if (isTourClosed) return false;
      if (selectedRoute.includes(i)) return false;

      const { d } = getWeightDistantbyPickupDropoff(
        lastElement,
        i,
        weightDistantData
      );
      const { status } = addNodeToRoute(i, d);
      return status;
    }

    // Deselect
    if (selectedRoute.indexOf(i) !== -1) {
      const removed = deleteNodeToRoute(i);
      return !removed;
    }
    return true;
  };

  const renderRoute = () => {
    const filteredLines: LineInfo[] = [];

    if (isToggled) {
      // View All Arcs: draw every edge once (dashed), and route steps solid
      const seenPairs = new Set<string>();

      lines.forEach((line) => {
        const pair = `${Math.min(line.from, line.to)}-${Math.max(line.from, line.to)}`;
        if (seenPairs.has(pair)) return;
        seenPairs.add(pair);

        const step = getRouteStep(line.from, line.to);
        if (step) {
          filteredLines.push(styleAsRouteEdge(line, step[0], step[1]));
        } else {
          filteredLines.push(line);
        }
      });
    } else {
      // Route steps
      for (let i = 0; i < selectedRoute.length - 1; i++) {
        const a = selectedRoute[i];
        const b = selectedRoute[i + 1];
        const matchingLine = findLineBetween(a, b);
        if (!matchingLine) continue;
        filteredLines.push(styleAsRouteEdge(matchingLine, a, b));
      }

      // Candidate edges from the last visited node
      if (selectedRoute.length > 0 && !isTourClosed) {
        const lastVisited = selectedRoute[selectedRoute.length - 1];
        const unvisited = getUnvisitedNodes();

        // When every node is visited, the only candidate is going back to 1
        const candidates =
          unvisited.length === 0 && lastVisited !== 1 ? [1] : unvisited;

        candidates.forEach((node) => {
          const matchingLine = findLineBetween(lastVisited, node);
          if (matchingLine) filteredLines.push(matchingLine);
        });
      }
    }

    return renderLines(filteredLines);
  };

  const renderHoverLines = () => {
    if (hoveredNode === null) return null;
    // Nodes already in the route get their candidate lines from renderRoute,
    // so drawing them again here would duplicate them
    if (selectedRoute.includes(hoveredNode)) return null;

    const unvisited = getUnvisitedNodes().filter((n) => n !== hoveredNode);
    const filteredLines: LineInfo[] = [];
    unvisited.forEach((node) => {
      const matchingLine = findLineBetween(hoveredNode, node);
      if (matchingLine) filteredLines.push(matchingLine);
    });
    return renderLines(filteredLines);
  };

  const handleLineMouseEnter = (
    from: number,
    to: number,
    d: number,
    color: string,
    style: string
  ) => {
    setNoteContent(`From: ${from}\nTo: ${to}\nDistance: ${d}\n`);
    setCurrentLineType(`${style} ${color}`);
  };

  const handleLineMouseLeave = () => {
    setNoteContent("");
    setCurrentLineType("");
  };

  const renderLines = (lineList: LineInfo[]) => {
    return (
      <div>
        {lineList.map((line, i) => {
          const radius = 15;
          const center1 = { cx: line.x1 * 100, cy: line.y1 * 100, r: radius };
          const center2 = { cx: line.x2 * 100, cy: line.y2 * 100, r: radius };
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
              key={`line-${line.from}-${line.to}-${i}`}
              to={{ x: closestPoint1.x, y: closestPoint1.y }}
              from={{ x: line.x2 * 100, y: line.y2 * 100 }}
              style={`${line.style}`}
              className={line.color}
              display={line.display}
              showArrow={false}
              onMouseEnter={() =>
                handleLineMouseEnter(
                  line.from,
                  line.to,
                  line.d,
                  line.color,
                  line.style
                )
              }
              onMouseLeave={handleLineMouseLeave}
            />
          );
        })}
        {lineList.map((line, i) => {
          if (line.display === "hidden") return null;

          const midX = (line.x1 * 100 + line.x2 * 100) / 2;
          const midY = (line.y1 * 100 + line.y2 * 100) / 2;

          return (
            <div
              key={`distance-${line.from}-${line.to}-${i}`}
              className="absolute text-xs bg-white px-1 rounded shadow-sm pointer-events-none"
              style={{
                left: `${midX}px`,
                top: `${midY}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {line.d}
            </div>
          );
        })}
      </div>
    );
  };

  const renderBoardPiece = () => {
    return coordinateData.map((nodeList, index) => {
      return (
        <Node
          key={`node-${index}`}
          x={nodeList.x}
          y={nodeList.y}
          onMouseEnter={() => setHoveredNode(nodeList.node)}
          onMouseLeave={() => setHoveredNode(null)}
          onClickedDefault={selectedRoute.includes(nodeList.node)}
          isDeparts={false}
          isDepot={false}
          onClick={(isSelected: boolean) =>
            handleOnClickedNode(isSelected, index + 1)
          }
          filename={filename}
          resetSignal={resetSignal}
          correspondingLoc={nodeList.location}
        >
          {nodeList.node}
        </Node>
      );
    });
  };

  const handleZoomIn = () => {
    setMapState((prev) => ({ ...prev, scale: prev.scale * 1.2 }));
  };

  const handleZoomOut = () => {
    setMapState((prev) => ({ ...prev, scale: prev.scale / 1.2 }));
  };

  return (
    <div className="bg-popover rounded-xl h-full relative overflow-hidden">
      <MapInteractionCSS
        value={mapState}
        onChange={(value) => setMapState(value)}
        minScale={0.1}
        maxScale={3}
      >
        {!isToggled && renderHoverLines()}
        {renderRoute()}
        {renderBoardPiece()}
      </MapInteractionCSS>
      <div className="absolute left-2 sm:left-4 top-2 sm:top-4 flex flex-col gap-2">
        <Button
          onClick={handleZoomIn}
          className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-white shadow-md text-destructive rounded-md hover:bg-destructive hover:text-white"
        >
          <div>
            <Plus size={12} className="sm:hidden" />
            <Plus size={16} className="hidden sm:block" />
          </div>
        </Button>
        <Button
          onClick={handleZoomOut}
          className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-white shadow-md rounded-md hover:bg-black hover:text-white"
        >
          <div>
            <Minus size={12} className="sm:hidden" />
            <Minus size={16} className="hidden sm:block" />
          </div>
        </Button>
      </div>
      <NoteBox
        isVisible={true}
        currentLineType={currentLineType}
        numberOfLine={2}
        mode="sp"
      >
        {noteContent}
      </NoteBox>
      <CollapsableSheet
        content={() => TSPContent({ dataItem: retrievedData! })}
      />
    </div>
  );
}