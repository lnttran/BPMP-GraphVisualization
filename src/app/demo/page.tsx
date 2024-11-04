"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { ChevronLeft, Play, Pause, RotateCcw } from "lucide-react";

export default function DemoPage() {
  return (
    <div className="relative bg-background h-full">
      <div className="relative flex flex-col gap-4 h-full">
        <div className="font-extrabold text-[32px]">Demo</div>
        <div className="relative w-full bg-popover rounded-xl flex flex-row gap-4 h-full p-5 overflow-y-auto">
          <main className="flex-grow p-6 space-y-6 ">
            <Card className="w-full max-w-6xl mx-auto border-none bg-white">
              <CardHeader>
                <CardTitle>How to Use BPMP</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  {/* <video className="w-fit h-full object-contain" controls>
                    <source src="/BPMP Demo 2.mov" type="video/quicktime" />
                  </video> */}

                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/1a5iuO0mO5s"
                    title="BPMP Demo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
