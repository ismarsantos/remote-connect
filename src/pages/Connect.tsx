
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { toast } from "sonner";
import { Video, Users } from "lucide-react";
import VideoCallRoom from '@/components/VideoCallRoom';

export default function Connect() {
  const [inCall, setInCall] = useState(false);
  const [meetingCode, setMeetingCode] = useState('');
  const [isCreatingMeeting, setIsCreatingMeeting] = useState(false);
  const [isJoiningMeeting, setIsJoiningMeeting] = useState(false);

  const handleCreateMeeting = () => {
    setIsCreatingMeeting(true);
    
    // Simulate API call or connection setup
    setTimeout(() => {
      setIsCreatingMeeting(false);
      setInCall(true);
      toast.success("Meeting created successfully");
    }, 1500);
  };

  const handleJoinMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!meetingCode.trim()) {
      toast.error("Please enter a meeting code");
      return;
    }
    
    setIsJoiningMeeting(true);
    
    // Simulate API call or connection setup
    setTimeout(() => {
      setIsJoiningMeeting(false);
      setInCall(true);
      toast.success(`Joined meeting: ${meetingCode}`);
    }, 1500);
  };

  if (inCall) {
    return (
      <div className="flex flex-col h-screen bg-gray-950">
        <VideoCallRoom />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        <div className="max-w-3xl w-full space-y-8 animate-fade-in">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Remote Connect</h1>
            <p className="text-xl text-gray-600">
              Start or join a video conference meeting
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 w-full">
            {/* Create new meeting */}
            <Card className="hover-scale">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="mr-2 h-5 w-5" />
                  New Meeting
                </CardTitle>
                <CardDescription>
                  Create a new video conference and invite others
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-40 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md flex items-center justify-center">
                  <div className="text-center p-4">
                    <Video className="mx-auto h-10 w-10 text-primary" />
                    <p className="mt-2 text-sm text-gray-600">Start a secure video conference</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={handleCreateMeeting}
                  disabled={isCreatingMeeting}
                >
                  {isCreatingMeeting ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-200 border-t-white"></span>
                      Creating...
                    </>
                  ) : (
                    "Create Meeting"
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            {/* Join existing meeting */}
            <Card className="hover-scale">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Join Meeting
                </CardTitle>
                <CardDescription>
                  Join an existing video conference with a code
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleJoinMeeting} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="meeting-code" className="text-sm font-medium">
                      Meeting Code
                    </label>
                    <Input
                      id="meeting-code"
                      placeholder="Enter meeting code"
                      value={meetingCode}
                      onChange={(e) => setMeetingCode(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={handleJoinMeeting}
                  disabled={isJoiningMeeting}
                >
                  {isJoiningMeeting ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-200 border-t-white"></span>
                      Joining...
                    </>
                  ) : (
                    "Join Meeting"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-medium mb-4">Quick Tips</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Test your camera and microphone before joining a meeting
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Use a headset for better audio quality
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Share the meeting code with participants you want to invite
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Find a quiet place with good lighting for the best experience
              </li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
