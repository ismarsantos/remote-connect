
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Users, 
  MessageSquare, 
  ScreenShare, 
  PhoneOff,
  Settings,
  MoreVertical
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface Participant {
  id: string;
  name: string;
  audio: boolean;
  video: boolean;
  isScreenSharing: boolean;
}

const VideoCallRoom = () => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([
    { id: '1', name: 'You', audio: true, video: true, isScreenSharing: false },
    { id: '2', name: 'Alex Johnson', audio: true, video: true, isScreenSharing: false },
    { id: '3', name: 'Maria Silva', audio: false, video: true, isScreenSharing: false },
    { id: '4', name: 'John Doe', audio: true, video: false, isScreenSharing: false },
  ]);

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    toast.info(isVideoOn ? "Camera turned off" : "Camera turned on");
    
    // Update your participant state
    setParticipants(prev => 
      prev.map(p => p.id === '1' ? {...p, video: !isVideoOn} : p)
    );
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
    toast.info(isAudioOn ? "Microphone muted" : "Microphone unmuted");
    
    // Update your participant state
    setParticipants(prev => 
      prev.map(p => p.id === '1' ? {...p, audio: !isAudioOn} : p)
    );
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    toast.info(isScreenSharing ? "Screen sharing stopped" : "Screen sharing started");
    
    // Update your participant state
    setParticipants(prev => 
      prev.map(p => p.id === '1' ? {...p, isScreenSharing: !isScreenSharing} : p)
    );
  };

  const leaveCall = () => {
    toast.info("Leaving call...");
    // In a real app, this would disconnect from the call
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Main video grid */}
      <div className={cn(
        "flex-1 grid gap-4 p-4 transition-all duration-300",
        participants.length <= 1 ? "grid-cols-1" : 
        participants.length <= 4 ? "grid-cols-2" : 
        "grid-cols-3"
      )}>
        {participants.map((participant) => (
          <div 
            key={participant.id} 
            className={cn(
              "relative rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center transition-all",
              participant.isScreenSharing ? "col-span-2 row-span-2" : ""
            )}
          >
            {participant.video ? (
              <div className="w-full h-full bg-gray-700">
                {/* Simulated video with gradient background */}
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  {participant.isScreenSharing ? (
                    <div className="text-white text-center">
                      <ScreenShare className="h-12 w-12 mx-auto mb-2 opacity-70" />
                      <p className="text-sm opacity-70">{participant.name} is sharing their screen</p>
                    </div>
                  ) : (
                    <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url("https://i.pravatar.cc/300?u=${participant.id}")` }} />
                  )}
                </div>
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center">
                <span className="text-white text-2xl font-medium">
                  {participant.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            )}
            
            {/* Participant name and status */}
            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center bg-black bg-opacity-50 rounded-md px-3 py-1.5">
              <span className="text-white truncate">{participant.name}</span>
              <div className="flex space-x-1">
                {!participant.audio && <MicOff className="h-4 w-4 text-red-500" />}
                {!participant.video && <VideoOff className="h-4 w-4 text-red-500" />}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Control bar */}
      <div className="bg-gray-900 py-3 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button 
            size="icon" 
            variant="outline" 
            onClick={() => toast.info("Meeting information")}
          >
            <Users className="h-5 w-5" />
          </Button>
          <span className="text-white">Meeting ID: 123-456-789</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="icon" 
                variant={isAudioOn ? "outline" : "destructive"} 
                onClick={toggleAudio}
              >
                {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isAudioOn ? "Turn off microphone" : "Turn on microphone"}
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="icon" 
                variant={isVideoOn ? "outline" : "destructive"} 
                onClick={toggleVideo}
              >
                {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isVideoOn ? "Turn off camera" : "Turn on camera"}
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="icon" 
                variant={isScreenSharing ? "secondary" : "outline"} 
                onClick={toggleScreenShare}
              >
                <ScreenShare className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isScreenSharing ? "Stop sharing" : "Share screen"}
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="icon" 
                variant={isChatOpen ? "secondary" : "outline"} 
                onClick={toggleChat}
              >
                <MessageSquare className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isChatOpen ? "Close chat" : "Open chat"}
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="icon" 
                variant="outline" 
                onClick={() => toast.info("Settings menu")}
              >
                <Settings className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Settings
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="icon" 
                variant="outline" 
                onClick={() => toast.info("More options")}
              >
                <MoreVertical className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              More options
            </TooltipContent>
          </Tooltip>
          
          <Separator orientation="vertical" className="h-8 bg-gray-700" />
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="icon" 
                variant="destructive" 
                className="hover:bg-red-700"
                onClick={leaveCall}
              >
                <PhoneOff className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Leave call
            </TooltipContent>
          </Tooltip>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => toast.info("Invite participants")}>
            <Users className="h-4 w-4 mr-2" />
            <span>Invite</span>
          </Button>
        </div>
      </div>
      
      {/* Chat sidebar */}
      {isChatOpen && (
        <div className="absolute top-0 right-0 bottom-0 w-80 bg-gray-900 border-l border-gray-800 flex flex-col animate-slide-in-right">
          <div className="p-4 border-b border-gray-800 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Chat</h3>
            <Button variant="ghost" size="sm" onClick={toggleChat}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">Alex Johnson</span>
                <div className="bg-gray-800 rounded-md p-2 mt-1">
                  <p className="text-sm text-white">Hi everyone, can you see my screen?</p>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">Maria Silva</span>
                <div className="bg-gray-800 rounded-md p-2 mt-1">
                  <p className="text-sm text-white">Yes, it's visible.</p>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">You</span>
                <div className="bg-blue-600 rounded-md p-2 mt-1">
                  <p className="text-sm text-white">Thanks for joining everyone!</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-gray-800">
            <div className="flex">
              <input
                type="text"
                placeholder="Type a message"
                className="flex-1 rounded-l-md bg-gray-800 border-0 text-white focus:ring-2 focus:ring-blue-500 px-3 py-2"
              />
              <Button className="rounded-l-none">Send</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCallRoom;
