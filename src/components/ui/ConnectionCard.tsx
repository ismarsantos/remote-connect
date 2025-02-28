
import { useState } from 'react';
import { 
  Monitor, 
  MoreVertical, 
  Star, 
  Clock, 
  Power, 
  Edit, 
  Trash2, 
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

export interface ConnectionProps {
  id: string;
  name: string;
  host: string;
  port: string;
  lastConnected?: string;
  isFavorite?: boolean;
  status?: 'online' | 'offline' | 'sleep';
  type?: 'windows' | 'mac' | 'linux' | 'custom';
}

export function ConnectionCard({ 
  id, 
  name, 
  host, 
  port, 
  lastConnected, 
  isFavorite = false, 
  status = 'offline',
  type = 'windows'
}: ConnectionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [favorite, setFavorite] = useState(isFavorite);
  
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    sleep: 'bg-amber-500'
  };
  
  const typeIcons = {
    windows: '/windows-icon.svg',
    mac: '/mac-icon.svg',
    linux: '/linux-icon.svg',
    custom: '/monitor-icon.svg'
  };
  
  const handleConnect = () => {
    console.log(`Connecting to ${name} (${host}:${port})`);
    // Logic to initiate connection
  };
  
  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorite(!favorite);
  };
  
  return (
    <div
      className={cn(
        'relative glass-morphism p-5 rounded-xl transition-all duration-300 hover-lift',
        isHovered && 'scale-[1.02]'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Status indicator */}
      <div className="absolute top-5 right-5 flex items-center">
        <div className={cn('h-2 w-2 rounded-full mr-2', statusColors[status])} />
        <span className="text-xs text-gray-500 capitalize">{status}</span>
      </div>
      
      {/* Favorite button */}
      <button
        className={cn(
          'absolute top-5 left-5 p-1 rounded-full transition-colors',
          favorite ? 'text-amber-500' : 'text-gray-400 hover:text-gray-600'
        )}
        onClick={handleFavoriteToggle}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Star size={16} fill={favorite ? 'currentColor' : 'none'} />
      </button>
      
      {/* Connection details */}
      <div className="mt-6 mb-4 flex flex-col items-center text-center">
        <div className="mb-3 h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center">
          <Monitor size={28} className="text-gray-700" />
        </div>
        <h3 className="text-lg font-medium">{name}</h3>
        <p className="text-sm text-gray-500 mt-1">
          {host}:{port}
        </p>
      </div>
      
      {/* Last connected */}
      {lastConnected && (
        <div className="flex items-center justify-center text-xs text-gray-500 mb-4">
          <Clock size={12} className="mr-1" />
          <span>Last connected: {lastConnected}</span>
        </div>
      )}
      
      {/* Actions */}
      <div className="flex items-center space-x-2">
        <Button 
          className="flex-1 rounded-lg"
          size="sm"
          onClick={handleConnect}
        >
          <Power size={14} className="mr-1" />
          Connect
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg">
              <MoreVertical size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <Edit size={14} className="mr-2" />
              Edit connection
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ExternalLink size={14} className="mr-2" />
              Connection details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash2 size={14} className="mr-2" />
              Delete connection
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Animation overlay */}
      <div
        className={cn(
          'absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent to-white/20 opacity-0 transition-opacity duration-300',
          isHovered && 'opacity-100'
        )}
      />
    </div>
  );
}
