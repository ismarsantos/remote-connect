
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedLogo } from '@/components/ui/AnimatedLogo';
import { Button } from '@/components/ui/button';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'Connect', path: '/connect' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Settings', path: '/settings' },
  ];
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled ? 'py-3 bg-white/80 backdrop-blur-md shadow-sm' : 'py-5 bg-transparent',
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 transition-opacity hover:opacity-80"
        >
          <AnimatedLogo size="sm" />
          <span className="font-medium text-lg">Cozy Connect</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'px-4 py-2 rounded-md text-sm font-medium transition-all',
                isActive(item.path)
                  ? 'text-gray-900 bg-gray-100'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        {/* Call to Action Button */}
        <div className="hidden md:block">
          <Button asChild size="sm" className="rounded-full">
            <Link to="/connect">Quick Connect</Link>
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-white pt-20 px-4 transform transition-transform duration-300 ease-in-out md:hidden',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <nav className="flex flex-col space-y-1">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'px-4 py-3 rounded-lg text-base font-medium transition-all',
                isActive(item.path)
                  ? 'text-gray-900 bg-gray-100'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              )}
            >
              {item.label}
            </Link>
          ))}
          
          <div className="pt-4 mt-4 border-t border-gray-100">
            <Button asChild className="w-full rounded-full">
              <Link to="/connect">Quick Connect</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
