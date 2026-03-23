"use client";
import React, { useState, useEffect } from "react";
import { MapInteractionCSS } from "react-map-interaction";
import Node from "../ui/node";
import Line from "../ui/line";
import NoteBox from "../ui/noteBox";
import CollapsableSheet from "../collapsableSheet/CollapsableSheet";
import { LineTypeMST } from "../tools/LineType";
import { Plus, Minus } from "lucide-react"; // Import icons
import { Button } from "../ui/button";
import { useDataMSTContext } from "../context/DataMSTContext";
import { useRouteMSTContext } from "@/components/context/RouteMSTContext";
import {
  calculateAngle,
  calculateSnapPoints,
  findClosestSnapPoint,
  getCoordinatesByNode,
  getWeightDistantbyPickupDropoff,
} from "./GraphVisualizer";
import { Point } from "framer-motion";
import MSTContent from "../collapsableSheet/MSTContent";
import { useToast } from "@/components/ui/use-toast";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";
import {
  ToastDescription,
  ToastTitle,
} from "@/components/ui/toast";

export default function MSTGraphVisualiser({
  filename,
  resetSignal,
  isToggled,
}: {
  filename: string;
  resetSignal: boolean;
  isToggled: boolean;
}) {
  const { toast } = useToast();
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const { selectedEdges, selectedNodes, addEdge, removeEdge, resetMST, setSelectedNodes } =
    useRouteMSTContext();
  const [noteContent, setNoteContent] = useState("");
  const [currentLineType, setCurrentLineType] = useState("");
  const { retrievedData } = useDataMSTContext();
  const [mapState, setMapState] = useState({
    scale: 0.5,
    translation: { x: 0, y: 0 },
  });

  const weightDistantData = retrievedData?.data?.weightDistantData || [];
  const coordinateData = retrievedData?.coordinate || [];
  const dataSize = coordinateData.length;
  const lastNode = dataSize;

  useEffect(() => {
    resetMST();
  }, [filename]);

  useEffect(() => {
    if (filename && (window as any).optimalButtonControl) {
      (window as any).optimalButtonControl.setCurrentFile(filename);
    }
    resetMST();
  }, [filename]);

  useEffect(() => {
    if (selectedEdges.length > 0) {
      checkOptimalPath();
    }
  }, [selectedEdges]);

  useEffect(() => {
    if (resetSignal !== undefined) {
      resetMST();
    }
  }, [resetSignal]);

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
    } = LineTypeMST({ d: d });

    const edgeExists = lines.some(
      existingLine =>
        (existingLine.from === link.x && existingLine.to === link.y) ||
        (existingLine.from === link.y && existingLine.to === link.x)
    );

    if (edgeExists) {
      return lines;
    }

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

  const checkOptimalPath = async () => {
    console.log("=== Checking optimal solution (MST) ===");
    console.log("Current selectedEdges:", selectedEdges);

    try {
      const response = await fetch(
        `/api/mst/data/optimalSolution?filename=${encodeURIComponent(filename)}`
      );

      if (response.ok) {
        const optimalSolution = await response.json();

        const edges = optimalSolution.content.edges;
        let isMatch = false;

        if (edges && edges.length > 0) {
          isMatch = JSON.stringify(selectedEdges) === JSON.stringify(edges);

          console.log("Optimal edges:", edges);
          console.log("Current edges:", selectedEdges);
          console.log("Match:", isMatch);
        }

        if (isMatch) {
          console.log("✓ Found optimal solution!");
          if ((window as any).optimalButtonControl) {
            (window as any).optimalButtonControl.setOptimalFound();
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

/*   const handleOnClickedNode = (isSelected: boolean, nodeId: number): boolean => {
    /* if (isSelected) {
      if (selectedNodes.size === 0) {
        setSelectedNodes(new Set([nodeId]));
        toast({
          variant: "destructive",
          style: { height: "auto", borderRadius: "15px" },
          description: (
            <div className="flex flex-row items-center gap-10">
              <IoIosCheckmarkCircleOutline className="text-white" size={"40px"} />
              <div>
                <ToastTitle className="text-xl font-bold text-white">
                  Starting node selected
                </ToastTitle>
                <ToastDescription className="text-lg text-white">
                  {`Node ${nodeId} is now the starting point`}
                </ToastDescription>
              </div>
            </div>
          ),
        });
        return true;
      }

      if (selectedNodes.has(nodeId)) {
        return false;
      }

      const possibleEdges = weightDistantData.filter(
        link =>
          (selectedNodes.has(link.x) && link.y === nodeId) ||
          (selectedNodes.has(link.y) && link.x === nodeId)
      );

      if (possibleEdges.length === 0) {
        toast({
          variant: "destructive",
          style: { height: "auto", borderRadius: "15px" },
          description: (
            <div className="flex flex-row items-center gap-10">
              <MdErrorOutline className="text-white" size={"50px"} />
              <div>
                <ToastTitle className="text-xl font-bold text-white">
                  Node not reachable
                </ToastTitle>
                <ToastDescription className="text-lg text-white">
                  No edge exists from current node to node {nodeId}
                </ToastDescription>
              </div>
            </div>
          ),
        });
        return false;
      }

      let minEdge = possibleEdges[0];
      for (const edge of possibleEdges) {
        if (edge.d < minEdge.d) {
          minEdge = edge;
        }
      }

      let from = minEdge.x;
      let to = minEdge.y;
      if (!selectedNodes.has(from)) {
        [from, to] = [to, from];
      }

      const { status: result } = addEdge(from, to, minEdge.d);

      if (result) {
        if (selectedNodes.size === dataSize) {
          if ((window as any).optimalButtonControl) {
            (window as any).optimalButtonControl.incrementAttempts();
          }
        }
        checkOptimalPath();
      }

      return result;
    } else {
      const firstNode = Array.from(selectedNodes)[0];
      if (nodeId === firstNode) {
        if (selectedEdges.length === 0) {
          setSelectedNodes(new Set());
          return true;
        } else {
          toast({
            variant: "destructive",
            style: { height: "auto", borderRadius: "15px" },
            description: (
              <div className="flex flex-row items-center gap-10">
                <MdErrorOutline className="text-white" size={"50px"} />
                <div>
                  <ToastTitle className="text-xl font-bold text-white">
                    Cannot remove starting node
                  </ToastTitle>
                  <ToastDescription className="text-lg text-white">
                    Please remove all edges first
                  </ToastDescription>
                </div>
              </div>
            ),
          });
          return true;
        }

      }

      if (selectedEdges.length > 0) {
        const lastEdge = selectedEdges[selectedEdges.length - 1];
        if (nodeId !== lastEdge.to) {
          toast({
            variant: "destructive",
            style: { height: "auto", borderRadius: "15px" },
            description: (
              <div className="flex flex-row items-center gap-10">
                <MdErrorOutline className="text-white" size={"50px"} />
                <div>
                  <ToastTitle className="text-xl font-bold text-white">
                    Cannot remove this node
                  </ToastTitle>
                  <ToastDescription className="text-lg text-white">
                    Please remove nodes in reverse order
                  </ToastDescription>
                </div>
              </div>
            ),
          });
          return true;
        }

        const result = removeEdge(lastEdge.from, lastEdge.to);

        if (result) {
          setSelectedNodes(prev => {
            const newSet = new Set(prev);
            newSet.delete(nodeId);
            return newSet;
          });
        }
        return result;
      }

      return true;
    } 
  } */

  const handleLineClick = (from: number, to: number, weight: number) => {
    const isSelected = selectedEdges.some(
      edge =>
        (edge.from === from && edge.to === to) ||
        (edge.from === to && edge.to === from)
    );

    if (isSelected) {
      const lastEdge = selectedEdges[selectedEdges.length - 1];
      const isLastEdge =
        (lastEdge.from === from && lastEdge.to === to) ||
        (lastEdge.from === to && lastEdge.to === from);

      if (!isLastEdge) {
        toast({
          variant: "destructive",
          style: { height: "auto", borderRadius: "15px" },
          description: (
            <div className="flex flex-row items-center gap-10">
              <MdErrorOutline className="text-white" size={"50px"} />
              <div>
                <ToastTitle className="text-xl font-bold text-white">
                  Cannot remove this edge
                </ToastTitle>
                <ToastDescription className="text-lg text-white">
                  Please remove edges in reverse order
                </ToastDescription>
              </div>
            </div>
          ),
        });
        return;
      }

      const result = removeEdge(lastEdge.from, lastEdge.to);
      if (result) {
        setSelectedNodes(prev => {
          const newSet = new Set(prev);
          newSet.delete(lastEdge.to);
          return newSet;
        });
      }
    } else {
      const fromSelected = selectedNodes.has(from);
      const toSelected = selectedNodes.has(to);

      if (selectedNodes.size === 0) {
        setSelectedNodes(new Set([from]));
        const { status: result } = addEdge(from, to, weight);
        return;
      }

      if (fromSelected && toSelected) {
        toast({
          variant: "destructive",
          style: { height: "auto", borderRadius: "15px" },
          description: (
            <div className="flex flex-row items-center gap-10">
              <MdErrorOutline className="text-white" size={"50px"} />
              <div>
                <ToastTitle className="text-xl font-bold text-white">
                  Both nodes already selected
                </ToastTitle>
              </div>
            </div>
          ),
        });
        return;
      }

      if (!fromSelected && !toSelected) {
        toast({
          variant: "destructive",
          style: { height: "auto", borderRadius: "15px" },
          description: (
            <div className="flex flex-row items-center gap-10">
              <MdErrorOutline className="text-white" size={"50px"} />
              <div>
                <ToastTitle className="text-xl font-bold text-white">
                  Must connect to selected node
                </ToastTitle>
              </div>
            </div>
          ),
        });
        return;
      }

      let finalFrom = fromSelected ? from : to;
      let finalTo = fromSelected ? to : from;

      const { status: result } = addEdge(finalFrom, finalTo, weight);
      if (result) {
        if (selectedNodes.size === dataSize) {
          if ((window as any).optimalButtonControl) {
            (window as any).optimalButtonControl.incrementAttempts();
          }
        }
        checkOptimalPath();
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
      display: string;
      from: number;
      to: number;
    }[] = [];

    if (isToggled) {
      const seenPairs = new Set<string>();

      filteredLines = lines.map((line) => {
        const isSelected = selectedEdges.some(
          edge =>
            (edge.from === line.from && edge.to === line.to) ||
            (edge.from === line.to && edge.to === line.from)
        );

        const lineType = LineTypeMST({
          d: line.d,
          from: line.from,
          to: line.to,
          selectedRoute: isSelected ? [line.from, line.to] : undefined,
          isToggle: isToggled,
        });

        let pair = `${Math.min(line.from, line.to)}-${Math.max(line.from, line.to)}`;

        if (seenPairs.has(pair)) {
          return {
            ...line,
            display: "hidden",
          };
        }

        seenPairs.add(pair);
        return {
          ...line,
          color: lineType.color,
          style: lineType.style,
          display: lineType.display,
        };
      });
    } else {
      selectedEdges.forEach(edge => {
        const matchingLine = lines.find(
          line =>
            (line.from === edge.from && line.to === edge.to) ||
            (line.from === edge.to && line.to === edge.from)
        );

        if (matchingLine) {
          const lineType = LineTypeMST({
            d: matchingLine.d,
            from: matchingLine.from,
            to: matchingLine.to,
            selectedRoute: [matchingLine.from, matchingLine.to],
            isToggle: false,
          });

          filteredLines.push({
            ...matchingLine,
            color: lineType.color,
            style: lineType.style,
            display: "block",
          });
        }
      });

      if (selectedNodes.size > 0) {
        const potentialLines = lines.filter(line => {
          const fromSelected = selectedNodes.has(line.from) && !selectedNodes.has(line.to);
          const toSelected = selectedNodes.has(line.to) && !selectedNodes.has(line.from);
          return (fromSelected || toSelected) && line.d < 9999;
        });

        potentialLines.forEach(line => {
          filteredLines.push({
            ...line,
            display: "block",
          });
        });
      }
    }

    return renderLines(filteredLines);
  };

  const renderHoverLines = () => {
    return null;
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
              onClick={() => handleLineClick(line.from, line.to, line.d)}
            />
          );
        })}
        {lineList.map((line, i) => {
          if (line.display === "hidden") return null;

          const midX = (line.x1 * 100 + line.x2 * 100) / 2;
          const midY = (line.y1 * 100 + line.y2 * 100) / 2;

          return (
            <div
              key={`distance-${i}`}
              className="absolute text-xs bg-white px-1 rounded shadow-sm pointer-events-none"
              style={{
                left: `${midX}px`,
                top: `${midY}px`,
                transform: 'translate(-50%, -50%)',
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
      const isNodeSelected = selectedNodes.has(nodeList.node);

      return (
        <Node
          key={`node-${index}`}
          x={nodeList.x}
          y={nodeList.y}
          onMouseEnter={() => setHoveredNode(nodeList.node)}
          onMouseLeave={() => setHoveredNode(null)}
          onClickedDefault={selectedNodes.has(nodeList.node)}
          isDeparts={false}
          isDepot={false}
          onClick={(isSelected: boolean) => isSelected}
/*           onClick={(isSelected: boolean) =>
            handleOnClickedNode(isSelected, nodeList.node)
          } */
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
        mode="mst"
      >
        {noteContent}
      </NoteBox>
      <CollapsableSheet
        content={() => MSTContent({ dataItem: retrievedData! })}
      />
    </div>
  );
}
