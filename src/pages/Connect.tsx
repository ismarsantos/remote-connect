
import { useState, useRef, useEffect } from 'react';
import { CheckCircle2, X, ChevronRight, HelpCircle, Monitor, Lock, History } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useReveal } from '@/utils/animations';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export default function Connect() {
  const [connecting, setConnecting] = useState(false);
  const [connectionSuccess, setConnectionSuccess] = useState(false);
  const [host, setHost] = useState('');
  const [port, setPort] = useState('3389');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberCredentials, setRememberCredentials] = useState(false);
  
  const containerReveal = useReveal();
  const formRef = useRef<HTMLFormElement>(null);
  
  const recentConnections = [
    { host: 'work-laptop.local', port: '3389', lastConnected: '2 hours ago' },
    { host: 'home-desktop.local', port: '3389', lastConnected: '1 day ago' },
    { host: '192.168.1.105', port: '3389', lastConnected: '3 days ago' },
  ];
  
  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!host) {
      toast.error('Please enter a host address');
      return;
    }
    
    setConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      setConnecting(false);
      setConnectionSuccess(true);
      
      toast.success(`Successfully connected to ${host}:${port}`);
      
      // Reset success message after delay
      setTimeout(() => {
        setConnectionSuccess(false);
      }, 3000);
    }, 2000);
  };
  
  const handleQuickConnect = (quickHost: string, quickPort: string) => {
    setHost(quickHost);
    setPort(quickPort);
    
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
      
      // Trigger the connect button after scrolling
      setTimeout(() => {
        if (formRef.current) {
          const submitButton = formRef.current.querySelector('button[type="submit"]');
          if (submitButton) {
            (submitButton as HTMLButtonElement).click();
          }
        }
      }, 500);
    }
  };
  
  useEffect(() => {
    // Reset form state when component mounts
    setConnecting(false);
    setConnectionSuccess(false);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div 
          className="container mx-auto px-4 max-w-4xl"
          ref={containerReveal.ref}
        >
          <div 
            className={cn(
              'text-center mb-12 transition-all duration-700',
              !containerReveal.isRevealed && 'opacity-0 translate-y-8',
              containerReveal.isRevealed && 'opacity-100 translate-y-0'
            )}
          >
            <h1 className="text-4xl font-bold tracking-tight mb-4">Connect Remotely</h1>
            <p className="text-xl text-gray-600">
              Establish a secure connection to your remote desktop in seconds.
            </p>
          </div>
          
          <div 
            className={cn(
              'glass-morphism rounded-xl overflow-hidden transition-all duration-700 delay-200',
              !containerReveal.isRevealed && 'opacity-0 translate-y-8',
              containerReveal.isRevealed && 'opacity-100 translate-y-0'
            )}
          >
            <Tabs defaultValue="quick">
              <div className="p-6 md:p-8 border-b border-gray-100">
                <TabsList className="grid grid-cols-3 mb-2">
                  <TabsTrigger value="quick" className="rounded-lg">Quick Connect</TabsTrigger>
                  <TabsTrigger value="saved" className="rounded-lg">Saved Connections</TabsTrigger>
                  <TabsTrigger value="advanced" className="rounded-lg">Advanced</TabsTrigger>
                </TabsList>
              </div>
              
              {/* Quick Connect Tab */}
              <TabsContent value="quick" className="p-6 md:p-8 focus:outline-none">
                <div className="grid gap-8 md:grid-cols-5">
                  <div className="col-span-2">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium flex items-center">
                        <History className="mr-2 h-5 w-5" />
                        Recent Connections
                      </h3>
                      
                      {recentConnections.length > 0 ? (
                        <div className="space-y-3">
                          {recentConnections.map((connection, index) => (
                            <div 
                              key={index}
                              className="glass-morphism hover-lift p-4 rounded-lg cursor-pointer"
                              onClick={() => handleQuickConnect(connection.host, connection.port)}
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium">{connection.host}</p>
                                  <p className="text-sm text-gray-500">Port: {connection.port}</p>
                                </div>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </div>
                              <p className="text-xs text-gray-400 mt-1">
                                {connection.lastConnected}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 text-gray-500">
                          <p>No recent connections</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="col-span-3">
                    <form ref={formRef} onSubmit={handleConnect} className="space-y-6">
                      <h3 className="text-lg font-medium flex items-center">
                        <Monitor className="mr-2 h-5 w-5" />
                        Connection Details
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="grid gap-3">
                          <div className="grid grid-cols-4 gap-3">
                            <div className="col-span-3">
                              <Label htmlFor="host">Host Address</Label>
                              <div className="relative">
                                <Input
                                  id="host"
                                  placeholder="hostname or IP address"
                                  value={host}
                                  onChange={(e) => setHost(e.target.value)}
                                  className="rounded-lg"
                                />
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                                    >
                                      <HelpCircle className="h-4 w-4 text-gray-400" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="w-60">
                                      Enter the hostname or IP address of the computer you want to connect to.
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="port">Port</Label>
                              <Input
                                id="port"
                                placeholder="3389"
                                value={port}
                                onChange={(e) => setPort(e.target.value)}
                                className="rounded-lg"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label htmlFor="username">Username</Label>
                              <Input
                                id="username"
                                placeholder="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="rounded-lg"
                              />
                            </div>
                            <div>
                              <Label htmlFor="password">Password</Label>
                              <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="rounded-lg"
                              />
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <input
                              id="remember"
                              type="checkbox"
                              checked={rememberCredentials}
                              onChange={(e) => setRememberCredentials(e.target.checked)}
                              className="rounded border-gray-300 text-primary focus:ring-primary/50"
                            />
                            <Label htmlFor="remember" className="text-sm cursor-pointer">
                              Remember credentials
                            </Label>
                          </div>
                        </div>
                        
                        <div className="pt-2">
                          <Button 
                            type="submit" 
                            className="w-full rounded-lg relative"
                            disabled={connecting || connectionSuccess}
                          >
                            {connecting ? (
                              <span className="flex items-center">
                                <span className="animate-spin mr-2 h-4 w-4 border-2 border-t-transparent border-white rounded-full"></span>
                                Connecting...
                              </span>
                            ) : connectionSuccess ? (
                              <span className="flex items-center">
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Connected!
                              </span>
                            ) : (
                              <span className="flex items-center">
                                <Lock className="mr-2 h-4 w-4" />
                                Connect Securely
                              </span>
                            )}
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </TabsContent>
              
              {/* Saved Connections Tab */}
              <TabsContent value="saved" className="p-6 md:p-8 focus:outline-none">
                <div className="text-center py-12">
                  <p className="text-gray-500">You don't have any saved connections yet.</p>
                  <p className="text-gray-500 mt-2">
                    Connect to a desktop and save it for quick access later.
                  </p>
                </div>
              </TabsContent>
              
              {/* Advanced Tab */}
              <TabsContent value="advanced" className="p-6 md:p-8 focus:outline-none">
                <div className="text-center py-12">
                  <p className="text-gray-500">Advanced connection options will be available soon.</p>
                  <p className="text-gray-500 mt-2">
                    Configure custom parameters, protocols, and security settings.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div 
            className={cn(
              'mt-8 text-center text-gray-500 text-sm transition-all duration-700 delay-400',
              !containerReveal.isRevealed && 'opacity-0',
              containerReveal.isRevealed && 'opacity-100'
            )}
          >
            <p>
              All connections are protected with end-to-end encryption and secure authentication.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
