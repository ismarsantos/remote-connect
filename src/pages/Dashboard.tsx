
import { useState } from 'react';
import { Server, ServerOff, Power, RefreshCw, MoreVertical, Star } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Types for our machine data
interface Machine {
  id: string;
  name: string;
  ipAddress: string;
  status: 'available' | 'occupied' | 'unavailable';
  isFavorite: boolean;
  lastConnected?: string;
}

const Dashboard = () => {
  // Sample data for remote machines
  const [machines, setMachines] = useState<Machine[]>([
    {
      id: "1",
      name: "Development Server",
      ipAddress: "192.168.1.101",
      status: "available",
      isFavorite: true,
      lastConnected: "10 minutes ago"
    },
    {
      id: "2",
      name: "Production Server",
      ipAddress: "192.168.1.102",
      status: "occupied", 
      isFavorite: false,
      lastConnected: "2 hours ago"
    },
    {
      id: "3",
      name: "Test Environment",
      ipAddress: "192.168.1.103",
      status: "unavailable",
      isFavorite: false
    },
    {
      id: "4",
      name: "Marketing Workstation",
      ipAddress: "192.168.1.104",
      status: "available",
      isFavorite: false,
      lastConnected: "1 day ago"
    }
  ]);
  
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter machines based on search
  const filteredMachines = machines.filter(machine => 
    machine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    machine.ipAddress.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Toggle favorite status
  const toggleFavorite = (id: string) => {
    setMachines(machines.map(machine => 
      machine.id === id 
        ? { ...machine, isFavorite: !machine.isFavorite } 
        : machine
    ));
    
    const machine = machines.find(m => m.id === id);
    if (machine) {
      toast.success(`${machine.name} ${machine.isFavorite ? 'removed from' : 'added to'} favorites`);
    }
  };
  
  // Machine actions
  const handleConnect = (machine: Machine) => {
    if (machine.status === "unavailable") {
      toast.error(`Cannot connect to ${machine.name}: Machine is unavailable`);
      return;
    }
    
    if (machine.status === "occupied") {
      toast.warning(`${machine.name} is currently occupied by another user`);
      return;
    }
    
    toast.success(`Connecting to ${machine.name}...`);
    // Here you would add logic to initiate the connection
  };
  
  const handleShutdown = (machine: Machine) => {
    toast.info(`Shutting down ${machine.name}...`);
    // Here you would add logic to shut down the machine
    
    // Update the machine status after a short delay to simulate the shutdown
    setTimeout(() => {
      setMachines(machines.map(m => 
        m.id === machine.id 
          ? { ...m, status: "unavailable" } 
          : m
      ));
      toast.success(`${machine.name} has been shut down`);
    }, 2000);
  };
  
  const handleRestart = (machine: Machine) => {
    toast.info(`Restarting ${machine.name}...`);
    // Here you would add logic to restart the machine
    
    // Update the machine status after a short delay to simulate restart
    setTimeout(() => {
      setMachines(machines.map(m => 
        m.id === machine.id 
          ? { ...m, status: "available" } 
          : m
      ));
      toast.success(`${machine.name} has been restarted`);
    }, 3000);
  };
  
  // Get appropriate icon and color based on machine status
  const getStatusDetails = (status: Machine['status']) => {
    switch (status) {
      case 'available':
        return { 
          icon: <Server className="h-6 w-6 text-green-500" />,
          color: 'bg-green-500',
          text: 'Available'
        };
      case 'occupied':
        return { 
          icon: <Server className="h-6 w-6 text-orange-500" />,
          color: 'bg-orange-500',
          text: 'Occupied'
        };
      case 'unavailable':
        return { 
          icon: <ServerOff className="h-6 w-6 text-gray-500" />,
          color: 'bg-gray-500',
          text: 'Unavailable'
        };
      default:
        return { 
          icon: <Server className="h-6 w-6" />,
          color: 'bg-gray-300',
          text: 'Unknown'
        };
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Remote Machines</h1>
          <p className="text-muted-foreground mt-1">
            Connect and manage your remote machines
          </p>
        </div>
        <div className="mt-4 md:mt-0 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Input
              type="text"
              placeholder="Search machines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
          </div>
        </div>
      </div>
      
      {filteredMachines.length === 0 ? (
        <div className="text-center py-12">
          <ServerOff className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No machines found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or add new machines.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMachines.map((machine) => {
            const { icon, color, text } = getStatusDetails(machine.status);
            
            return (
              <Card key={machine.id} className="transition-all duration-300 hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      {icon}
                      <div>
                        <CardTitle>{machine.name}</CardTitle>
                        <CardDescription>{machine.ipAddress}</CardDescription>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite(machine.id)}
                      className={cn(
                        "rounded-full",
                        machine.isFavorite ? "text-yellow-500" : "text-muted-foreground"
                      )}
                    >
                      <Star
                        className="h-5 w-5"
                        fill={machine.isFavorite ? "currentColor" : "none"}
                      />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`h-2.5 w-2.5 rounded-full ${color}`}></div>
                    <span className="text-sm">{text}</span>
                  </div>
                  
                  {machine.lastConnected && (
                    <p className="text-sm text-muted-foreground">
                      Last connected: {machine.lastConnected}
                    </p>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant={machine.status === "available" ? "default" : "outline"}
                    onClick={() => handleConnect(machine)}
                    disabled={machine.status === "unavailable"}
                  >
                    Connect
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleShutdown(machine)}
                        disabled={machine.status === "unavailable"}
                      >
                        <Power className="mr-2 h-4 w-4" />
                        <span>Shutdown</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleRestart(machine)}
                        disabled={machine.status === "unavailable"}
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        <span>Restart</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          toast.info(`Opening settings for ${machine.name}`);
                        }}
                      >
                        <span>Settings</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
