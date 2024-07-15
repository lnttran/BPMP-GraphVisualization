import { Button } from "@/components/ui/button";

export const CargoCard = ({ x, y, w }: { w: number; y: number; x: number }) => {
  return (
    <div className="relative h-fit bg-popover rounded-xl w-full p-2 flex flex-row justify-items-start justify-between mb-2">
      <div>{`${x} : ${y} `}</div>
      <div>{w}</div>
      <Button className="bg-accent hover:bg-destructive text-white w-6 h-6 rounded-md ">
        -
      </Button>
    </div>
  );
};

//
