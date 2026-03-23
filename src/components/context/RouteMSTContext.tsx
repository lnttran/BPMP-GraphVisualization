import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useToast } from "@/components/ui/use-toast";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import {
  ToastDescription,
  ToastTitle,
} from "@/components/ui/toast";
import { MdErrorOutline } from "react-icons/md";
import { DataItem } from "@/db/data";
import { useDataMSTContext } from "./DataMSTContext";

type Edge = {
  from: number;
  to: number;
  weight: number;
};

// Step 1: Define context type
type RouteMSTContextType = {
  selectedEdges: Edge[];  
  selectedNodes: Set<number>;  
  setSelectedEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  setSelectedNodes: React.Dispatch<React.SetStateAction<Set<number>>>;
  setOptimalSolutionEdges: (edges: Edge[]) => void;
  getEdgesList: () => string;
  resetMST: () => void;
  addEdge: (
    from: number,
    to: number,
    weight: number
  ) => { status: boolean };
  removeEdge: (from: number, to: number) => boolean;
  totalWeight: number;  
};

// Step 2: Create context
const RouteMSTContext = createContext<RouteMSTContextType | undefined>(undefined);

// Step 3: Create provider component with typed props
type RouteMSTProviderProps = {
  children: ReactNode;
};

export const RouteMSTProvider: React.FC<RouteMSTProviderProps> = ({
  children,
}) => {
  const [selectedEdges, setSelectedEdges] = useState<Edge[]>([]);
  const [selectedNodes, setSelectedNodes] = useState<Set<number>>(new Set());
  const [totalWeight, setTotalWeight] = useState<number>(0);
  const { toast } = useToast();
  const { retrievedData } = useDataMSTContext();
  const weightDistantData = retrievedData?.data?.weightDistantData || [];

  const calculateTotalWeight = (edges: Edge[]) => {
    const total = edges.reduce((sum, edge) => sum + edge.weight, 0);
    setTotalWeight(parseFloat(total.toFixed(2)));
  };

  const setOptimalSolutionEdges = (edges: Edge[]) => {
    setSelectedEdges(edges);
    calculateTotalWeight(edges);
    const nodes = new Set<number>();
    edges.forEach(edge => {
      nodes.add(edge.from);
      nodes.add(edge.to);
    });
    setSelectedNodes(nodes);
  };

  const getEdgesList = () => {
    return selectedEdges
      .map(edge => `${edge.from}-${edge.to} (${edge.weight})`)
      .join(", ");
  };

  const resetMST = () => {
    setSelectedEdges([]);
    setSelectedNodes(new Set());
    setTotalWeight(0);
  };

  const addEdge = (
    from: number,
    to: number,
    weight: number
  ): { status: boolean } => {
    const edgeExists = selectedEdges.some(
      edge => (edge.from === from && edge.to === to) ||
        (edge.from === to && edge.to === from)
    );

    if (edgeExists) {
      toast({
        variant: "destructive",
        style: { height: "auto", borderRadius: "15px" },
        description: (
          <div className="flex flex-row items-center gap-10">
            <MdErrorOutline className="text-white" size={"50px"} />
            <div>
              <ToastTitle className="text-xl font-bold text-white">
                Edge already selected
              </ToastTitle>
            </div>
          </div>
        ),
      });
      return { status: false };
    }

    if (weight > 9998) {
      toast({
        variant: "destructive",
        style: { height: "auto", borderRadius: "15px" },
        description: (
          <div className="flex flex-row items-center gap-10">
            <MdErrorOutline className="text-white" size={"50px"} />
            <div>
              <ToastTitle className="text-xl font-bold text-white">
                No edge exists between these nodes
              </ToastTitle>
            </div>
          </div>
        ),
      });
      return { status: false };
    }

    const newEdge = { from, to, weight };
    setSelectedEdges(prev => [...prev, newEdge]);

    setSelectedNodes(prev => {
      const newSet = new Set(prev);
      newSet.add(from);
      newSet.add(to);
      return newSet;
    });

    setTotalWeight(prev => parseFloat((prev + weight).toFixed(2)));

    toast({
      variant: "destructive",
      style: { height: "auto", borderRadius: "15px" },
      description: (
        <div className="flex flex-row items-center gap-10">
          <IoIosCheckmarkCircleOutline className="text-white" size={"40px"} />
          <div>
            <ToastTitle className="text-xl font-bold text-white">
              Edge added successfully
            </ToastTitle>
            <ToastDescription className="text-lg text-white">
              {`Edge ${from}-${to} (weight: ${weight}) added`}
            </ToastDescription>
          </div>
        </div>
      ),
    });

    return { status: true };
  };

  const removeEdge = (from: number, to: number): boolean => {
    const edgeIndex = selectedEdges.findIndex(
      edge => (edge.from === from && edge.to === to) ||
        (edge.from === to && edge.to === from)
    );

    if (edgeIndex === -1) {
      return false;
    }

    const removedEdge = selectedEdges[edgeIndex];
    const updatedEdges = selectedEdges.filter((_, index) => index !== edgeIndex);

    setSelectedEdges(updatedEdges);
    calculateTotalWeight(updatedEdges);

    const nodes = new Set<number>();
    updatedEdges.forEach(edge => {
      nodes.add(edge.from);
      nodes.add(edge.to);
    });
    if (updatedEdges.length === 0 && selectedNodes.size > 0) {
      const startNode = Array.from(selectedNodes)[0];
      nodes.add(startNode);
    }

    setSelectedNodes(nodes);

    toast({
      variant: "destructive",
      style: { height: "auto", borderRadius: "15px" },
      description: (
        <div className="flex flex-row items-center gap-10">
          <IoIosCheckmarkCircleOutline className="text-white" size={"40px"} />
          <div>
            <ToastTitle className="text-xl font-bold text-white">
              Removed successfully
            </ToastTitle>
            <ToastDescription className="text-lg text-white">
              {`Edge ${from}-${to} removed`}
            </ToastDescription>
          </div>
        </div>
      ),
    });

    return true;
  };

  return (
    <RouteMSTContext.Provider
      value={{
        selectedEdges,
        selectedNodes,
        setSelectedNodes,
        totalWeight,
        resetMST,
        setSelectedEdges,
        getEdgesList,
        addEdge,
        removeEdge,
        setOptimalSolutionEdges,
      }}
    >
      {children}
    </RouteMSTContext.Provider>
  );
};

// Step 4: Custom hook to use context
export const useRouteMSTContext = () => {
  const context = useContext(RouteMSTContext);
  if (!context) {
    throw new Error("useRouteMSTContext must be used within a RouteMSTProvider");
  }
  return context;
};