"use client";
import React, { useState, useEffect } from "react";
import { MapInteractionCSS } from "react-map-interaction";
import Node from "../ui/node";
import Line from "../ui/line";
import NoteBox from "../ui/noteBox";
import CollapsableSheet from "../collapsableSheet/CollapsableSheet";
import { LineTypeSP } from "../tools/LineType";
import { Plus, Minus } from "lucide-react"; // Import icons
import { Button } from "../ui/button";
import { useDataSPContext } from "../context/DataSPContext";
import { useRouteSPContext } from "../context/RouteSPContext";
import {
  calculateAngle,
  calculateSnapPoints,
  findClosestSnapPoint,
  getCoordinatesByNode,
  getWeightDistantbyPickupDropoff,
} from "./GraphVisualizer";
import { Point } from "framer-motion";
import SPContent from "../collapsableSheet/SPContent";

export default function SPGraphVisualiser({
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
    useRouteSPContext();
  const [noteContent, setNoteContent] = useState("");
  const [currentLineType, setCurrentLineType] = useState("");
  const { retrievedData, lastNode } = useDataSPContext();
  const [mapState, setMapState] = useState({
    scale: 0.5,
    translation: { x: 0, y: 0 },
  });

  const weightDistantData = retrievedData?.data?.weightDistantData || [];
  const coordinateData = retrievedData?.coordinate || [];
  const dataSize = coordinateData.length;

  useEffect(() => {
    resetRoute();
  }, [filename]);

  const lines = weightDistantData.reduce<
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
      display: string;
    }[]
  >((lines, link) => {
    const node1Coordinates = getCoordinatesByNode(link.x, coordinateData);
    const node2Coordinates = getCoordinatesByNode(link.y, coordinateData);
    const w = link.w;
    const d = link.d;

    const {
      style: style,
      color: color,
      display: display,
    } = LineTypeSP({ d: d });

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
        display,
        from: link.x,
        to: link.y,
      });
    }

    return lines;
  }, []);

  const handleOnClickedNode = (isSelected: boolean, i: number): boolean => {
    if (i == 1) {
      return false;
    }

    if (isSelected) {
      if (selectedRoute.includes(i)) {
        return false;
      }
      //add the node to selected route
      const lastElement = selectedRoute[selectedRoute.length - 1];
      if (lastElement == lastNode) {
        return false;
      }

      const { w, d } = getWeightDistantbyPickupDropoff(
        lastElement,
        i,
        weightDistantData
      );

      const { status: result, selectedRoute: thisSelectedRoute } =
        addNodeToRoute(i, d);
      return result;
    } else {
      let indexToRemove: number = selectedRoute.indexOf(i);

      if (indexToRemove !== -1) {
        const resutl = deleteNodeToRoute(i);
        return !resutl;
      }
      return true;
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
      display: string;
      from: number;
      to: number;
    }[] = [];

    if (isToggled) {
      const seenPairs = new Set<string>();

      filteredLines = lines.map((line) => {
        if (
          selectedRoute.includes(line.from) &&
          selectedRoute.includes(line.to)
        ) {
          const lineType = LineTypeSP({
            d: line.d,
            from: line.from,
            to: line.to,
            selectedRoute: selectedRoute,
            isToggle: isToggled,
          });

          return {
            ...line,
            color: lineType.color,
            style: lineType.style,
            display: lineType.display,
          };
        }

        let pair = `${Math.min(line.from, line.to)}-${Math.max(
          line.from,
          line.to
        )}`;

        let reversePair = `${Math.max(line.from, line.to)}-${Math.min(
          line.from,
          line.to
        )}`;

        if (seenPairs.has(pair) || seenPairs.has(reversePair)) {
          return {
            ...line,
            display: "hidden",
          };
        }

        seenPairs.add(pair);
        return line;
      });
    } else {
      for (let i = 0; i < selectedRoute.length; i++) {
        if (selectedRoute[i] == lastNode) {
          continue;
        }
        if (i < selectedRoute.length - 1) {
          for (let j = i + 1; j < selectedRoute.length; j++) {
            const startNode = selectedRoute[i];
            const endNode = selectedRoute[j];
            let lineType: { color: string; style: string; display: string } = {
              color: "",
              style: "",
              display: "",
            };

            // Find lines connecting current node to the next node
            const matchingLines = lines.filter((line) => {
              lineType = LineTypeSP({
                d: line.d,
                from: startNode,
                to: endNode,
                selectedRoute: selectedRoute,
                isToggle: isToggled,
              });
              return (
                line.x1 === getCoordinatesByNode(startNode, coordinateData).x &&
                line.y1 === getCoordinatesByNode(startNode, coordinateData).y &&
                line.x2 === getCoordinatesByNode(endNode, coordinateData).x &&
                line.y2 === getCoordinatesByNode(endNode, coordinateData).y &&
                line.from === startNode &&
                line.to === endNode
              );
            })[0];

            filteredLines.push({
              ...matchingLines,
              color: lineType.color,
              style: lineType.style,
              display: lineType.display,
            });
          }
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
                line.x1 === getCoordinatesByNode(lastNode, coordinateData)?.x &&
                line.y1 === getCoordinatesByNode(lastNode, coordinateData)?.y &&
                line.x2 === getCoordinatesByNode(node, coordinateData)?.x &&
                line.y2 === getCoordinatesByNode(node, coordinateData)?.y &&
                line.from === lastNode &&
                line.to === node
              );
            })
          );

          filteredLines.push(...matchingLines);
        }
      }
    }

    // Iterate through selectedRoute

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
          line.x1 === getCoordinatesByNode(hoveredNode, coordinateData)?.x &&
          line.y1 === getCoordinatesByNode(hoveredNode, coordinateData)?.y &&
          line.x2 === getCoordinatesByNode(node, coordinateData)?.x &&
          line.y2 === getCoordinatesByNode(node, coordinateData)?.y &&
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
    d: number,
    color: string,
    style: string
  ) => {
    setNoteContent(
      `From: ${from}\nTo: ${to}\nDistance: ${d}\n
     `
    );
    setCurrentLineType(`${style} ${color}`);
  };

  const handleLineMouseLeave = () => {
    setNoteContent("");
    setCurrentLineType("");
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
      display: string;
      color: string;
      from: number;
      to: number;
    }[]
  ) => {
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
              key={i}
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
          onClickedDefault={
            selectedRoute.includes(nodeList.node) && nodeList.node != lastNode
          }
          isDeparts={index == 0}
          isDepot={lastNode !== null && index === lastNode - 1}
          onClick={(isSelected: boolean) =>
            handleOnClickedNode(isSelected, index + 1)
          }
          filename={filename}
          resetSignal={resetSignal}
        >
          {nodeList.node}
        </Node>
      );
    });
  };

  const handleZoomIn = () => {
    setMapState((prev) => ({
      ...prev,
      scale: prev.scale * 1.2,
    }));
  };

  const handleZoomOut = () => {
    setMapState((prev) => ({
      ...prev,
      scale: prev.scale / 1.2,
    }));
  };

  return (
    <div className="bg-popover rounded-xl h-full relative overflow-hidden">
      <MapInteractionCSS
        value={mapState}
        onChange={(value) => setMapState(value)}
        minScale={0.1}
        maxScale={3}
        // className="w-full h-full"
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
      >
        {noteContent}
      </NoteBox>
      <CollapsableSheet
        content={() => SPContent({ dataItem: retrievedData! })}
      />
    </div>
  );
}
