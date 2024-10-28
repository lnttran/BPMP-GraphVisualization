"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { ChevronLeft, Play, Pause, RotateCcw } from "lucide-react";

export default function DemoPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const restartVideo = () => {
    // Logic to restart the video
    setIsPlaying(true);
  };

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
                  {/* <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/watch?v=1a5iuO0mO5s"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe> */}
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/1a5iuO0mO5s"
                    title="BPMP Demo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>

                {/* <div className="flex justify-center space-x-4 mt-4">
                  <Button onClick={togglePlay}>
                    {isPlaying ? (
                      <Pause className="mr-2" />
                    ) : (
                      <Play className="mr-2" />
                    )}
                    {isPlaying ? "Pause" : "Play"}
                  </Button>
                  <Button onClick={restartVideo}>
                    <RotateCcw className="mr-2" />
                    Restart
                  </Button>
                  <Toggle
                    pressed={showTranscript}
                    onPressedChange={setShowTranscript}
                  >
                    Show Transcript{" "}
                  </Toggle>
                </div> */}
              </CardContent>
            </Card>
            {showTranscript && (
              <Card className="w-full max-w-4xl mx-auto border-none">
                <CardHeader>
                  <CardTitle>Video Transcript</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    Welcome everyone. In this video I will guide you through
                    using our web application designed to solve backhaul profit
                    maximization problem. Let's get started.
                    <br />
                    <br />
                    First we'll dive into a visualization type and you can
                    select a data set that contains a pickup and drop off cargo
                    request. We have a multiple of data sets that you can play
                    around with and ranging from five to eight nodes for now. So
                    you can see here this one is 8 and for this video I'm going
                    to use the demo data 2. You can also see the maximum
                    capacity that the vehicle can carry and the maximum distance
                    that the route can cover. Next to it is the button to view
                    all of the available requests at once for you to manage all
                    of the requests easier or you want to stick with the options
                  </div>
                  {/* Add more transcript content here */}
                </CardContent>
              </Card>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
