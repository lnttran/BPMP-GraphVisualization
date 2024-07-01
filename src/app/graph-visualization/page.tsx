import GraphVisualiser from "@/components/GraphVisualizer/graphVisualizer"
import { Button } from "@/components/ui/button"
import Node from "@/components/ui/node"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectLabel,
    SelectGroup
} from "@/components/ui/select"

import React from 'react'

export default function GraphVisualization() {
    return (
        <div className='relative bg-background w-full px-10 pt-16'>
            <div className='flex flex-col gap-3'>
                <div className='font-extrabold text-[32px]'>
                    Graph Visulization
                </div>
                <div className='w-full h-20 bg-popover rounded-xl flex flex-row'>
                    <div className="p-5 flex flex-row gap-5">
                        <Select>
                            <SelectTrigger className="w-[450px] border-black">
                                <SelectValue placeholder="Select dataset" />
                            </SelectTrigger>
                            <SelectContent className="text-text__primary bg-background">
                                <SelectGroup>
                                    <SelectLabel>Fruits</SelectLabel>
                                    <SelectItem value="apple">Apple</SelectItem>
                                    <SelectItem value="banana">Banana</SelectItem>
                                    <SelectItem value="blueberry">Blueberry</SelectItem>
                                    <SelectItem value="grapes">Grapes</SelectItem>
                                    <SelectItem value="pineapple">Pineapple</SelectItem>
                                </SelectGroup>
                                <SelectGroup>
                                    <SelectLabel>Juice</SelectLabel>
                                    <SelectItem value="apple juice">Apple juice</SelectItem>
                                    <SelectItem value="banana juice">Banana juice</SelectItem>
                                    <SelectItem value="blueberry juice">Blueberryjuice</SelectItem>
                                    <SelectItem value="grapes juice">Grapes juice</SelectItem>
                                    <SelectItem value="pineapple juice">Pineapple juice</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Button className="bg-accent hover:bg-destructive text-white">
                            Select
                        </Button>
                    </div>
                </div>
                {/* <div className="h-full w-full">
                    <Node>1</Node>
                </div> */}
                <GraphVisualiser />
            </div>
        </div>
    )
}
