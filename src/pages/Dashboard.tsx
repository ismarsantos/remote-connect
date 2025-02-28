
import { useState, useEffect } from 'react';
import { Plus, Search, Filter, Clock, SortAsc, SortDesc, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useReveal, useStaggeredReveal } from '@/utils/animations';
import { ConnectionCard, ConnectionProps } from '@/components/ui/ConnectionCard';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

// Sample connection data
const sampleConnections: ConnectionProps[] = [
  { 
    id: '1', 
    name: 'Work Desktop', 
    host: 'work-desktop.local', 
    port: '3389', 
    lastConnected: '10 minutes ago',
    isFavorite: true,
    status: 'online',
    type: 'windows'
  },
  { 
    id: '2', 
    name: 'Home Laptop', 
    host: 'home-laptop.local', 
    port: '3389', 
    lastConnected: '2 hours ago',
    isFavorite: false,
    status: 'sleep',
    type: 'mac'
  },
  { 
    id: '3', 
    name: 'Development Server', 
    host: '192.168.1.105', 
    port: '3390', 
    lastConnected: '1 day ago',
    isFavorite: true,
    status: 'online',
    type: 'linux'
  },
  { 
    id: '4', 
    name: 'Media Center', 
    host: 'media-pc.local', 
    port: '3389', 
    lastConnected: '5 days ago',
    isFavorite: false,
    status: 'offline',
    type: 'windows'
  },
  { 
    id: '5', 
    name: 'Guest Computer', 
    host: '192.168.1.110', 
    port: '3389', 
    isFavorite: false,
    status: 'offline',
    type: 'custom'
  },
  { 
    id: '6', 
    name: 'Office Workstation', 
    host: 'office-desktop.local', 
    port: '3389', 
    lastConnected: '3 days ago',
    isFavorite: false,
    status: 'offline',
    type: 'windows'
  },
];

export default function Dashboard() {
  const [connections, setConnections] = useState<ConnectionProps[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showNewConnectionDialog, setShowNewConnectionDialog] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [activeFilter, setActiveFilter] = useState<'all' | 'online' | 'offline' | 'favorites'>('all');
  
  // Form state for new connection
  const [newConnectionName, setNewConnectionName] = useState('');
  const [newConnectionHost, setNewConnectionHost] = useState('');
  const [newConnectionPort, setNewConnectionPort] = useState('3389');
  const [newConnectionType, setNewConnectionType] = useState('windows');
  
  const containerReveal = useReveal();
  const { containerRef, visibleItems } = useStaggeredReveal(sampleConnections.length);
  
  // Initialize connections
  useEffect(() => {
    setConnections(sampleConnections);
  }, []);
  
  // Filter connections based on search query and active filter
  const filteredConnections = connections.filter(connection => {
    const matchesSearch = 
      connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      connection.host.toLowerCase().includes(searchQuery.toLowerCase());
      
    if (!matchesSearch) return false;
    
    switch (activeFilter) {
      case 'online':
        return connection.status === 'online';
      case 'offline':
        return connection.status === 'offline';
      case 'favorites':
        return connection.isFavorite;
      default:
        return true;
    }
  });
  
  // Sort connections
  const sortedConnections = [...filteredConnections].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });
  
  // Handle refresh connections
  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate refreshing connection statuses
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success('Connection statuses refreshed');
    }, 1500);
  };
  
  // Handle new connection submission
  const handleNewConnection = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newConnectionName || !newConnectionHost) {
      toast.error('Name and host are required');
      return;
    }
    
    const newConnection: ConnectionProps = {
      id: `new-${Date.now()}`,
      name: newConnectionName,
      host: newConnectionHost,
      port: newConnectionPort,
      status: 'offline',
      isFavorite: false,
      type: newConnectionType as 'windows' | 'mac' | 'linux' | 'custom',
    };
    
    setConnections([newConnection, ...connections]);
    setShowNewConnectionDialog(false);
    
    // Reset form
    setNewConnectionName('');
    setNewConnectionHost('');
    setNewConnectionPort('3389');
    setNewConnectionType('windows');
    
    toast.success('New connection added successfully');
  };
  
  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(current => current === 'asc' ? 'desc' : 'asc');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div 
          className="container mx-auto px-4"
          ref={containerReveal.ref}
        >
          <div 
            className={cn(
              'mb-8 transition-all duration-700',
              !containerReveal.isRevealed && 'opacity-0 translate-y-8',
              containerReveal.isRevealed && 'opacity-100 translate-y-0'
            )}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-gray-600 mt-1">
                  Manage and access your remote connections
                </p>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-lg"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                >
                  <RefreshCw className={cn('h-4 w-4 mr-2', isRefreshing && 'animate-spin')} />
                  {isRefreshing ? 'Refreshing...' : 'Refresh'}
                </Button>
                
                <Dialog open={showNewConnectionDialog} onOpenChange={setShowNewConnectionDialog}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="rounded-lg">
                      <Plus className="h-4 w-4 mr-2" />
                      New Connection
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Connection</DialogTitle>
                      <DialogDescription>
                        Enter the details of the remote computer you want to connect to.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <form onSubmit={handleNewConnection} className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="connection-name">Name</Label>
                        <Input
                          id="connection-name"
                          placeholder="My Work Computer"
                          value={newConnectionName}
                          onChange={(e) => setNewConnectionName(e.target.value)}
                          className="rounded-lg"
                        />
                      </div>
                      
                      <div className="grid grid-cols-4 gap-3">
                        <div className="col-span-3 space-y-2">
                          <Label htmlFor="connection-host">Host</Label>
                          <Input
                            id="connection-host"
                            placeholder="hostname or IP address"
                            value={newConnectionHost}
                            onChange={(e) => setNewConnectionHost(e.target.value)}
                            className="rounded-lg"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="connection-port">Port</Label>
                          <Input
                            id="connection-port"
                            placeholder="3389"
                            value={newConnectionPort}
                            onChange={(e) => setNewConnectionPort(e.target.value)}
                            className="rounded-lg"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="connection-type">Computer Type</Label>
                        <Select 
                          value={newConnectionType} 
                          onValueChange={setNewConnectionType}
                        >
                          <SelectTrigger id="connection-type" className="rounded-lg">
                            <SelectValue placeholder="Select computer type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="windows">Windows</SelectItem>
                            <SelectItem value="mac">Mac</SelectItem>
                            <SelectItem value="linux">Linux</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <DialogFooter className="pt-4">
                        <Button type="submit">Add Connection</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search connections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-lg"
                />
              </div>
              
              <div className="flex space-x-2">
                <Tabs value={activeFilter} onValueChange={(value) => setActiveFilter(value as any)}>
                  <TabsList className="grid grid-cols-4 h-9">
                    <TabsTrigger value="all" className="text-xs rounded-lg">All</TabsTrigger>
                    <TabsTrigger value="online" className="text-xs rounded-lg">Online</TabsTrigger>
                    <TabsTrigger value="offline" className="text-xs rounded-lg">Offline</TabsTrigger>
                    <TabsTrigger value="favorites" className="text-xs rounded-lg">Favorites</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-9 w-9 rounded-lg"
                  onClick={toggleSortOrder}
                >
                  {sortOrder === 'asc' ? (
                    <SortAsc className="h-4 w-4" />
                  ) : (
                    <SortDesc className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
          
          <div
            ref={containerRef}
            className={cn(
              'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-300',
              !containerReveal.isRevealed && 'opacity-0 translate-y-8',
              containerReveal.isRevealed && 'opacity-100 translate-y-0'
            )}
          >
            {sortedConnections.length > 0 ? (
              sortedConnections.map((connection, index) => (
                <div
                  key={connection.id}
                  className={cn(
                    'transition-all duration-500',
                    !visibleItems[index] && 'opacity-0 translate-y-8',
                    visibleItems[index] && 'opacity-100 translate-y-0'
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <ConnectionCard {...connection} />
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center">
                <p className="text-gray-500 mb-2">No connections found</p>
                <p className="text-gray-400 text-sm">
                  {searchQuery ? 'Try adjusting your search or filters' : 'Add a new connection to get started'}
                </p>
                
                {!searchQuery && (
                  <Button 
                    className="mt-4 rounded-lg" 
                    onClick={() => setShowNewConnectionDialog(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Connection
                  </Button>
                )}
              </div>
            )}
          </div>
          
          {connections.length > 0 && (
            <div 
              className={cn(
                'mt-8 flex justify-between items-center text-sm text-gray-500 transition-all duration-700 delay-500',
                !containerReveal.isRevealed && 'opacity-0',
                containerReveal.isRevealed && 'opacity-100'
              )}
            >
              <div>
                Showing {sortedConnections.length} of {connections.length} connections
              </div>
              
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>Last updated just now</span>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
