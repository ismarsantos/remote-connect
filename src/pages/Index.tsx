
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Monitor, Shield, Clock, Smartphone } from 'lucide-react';
import { useTypewriter, useReveal, useParallax } from '@/utils/animations';
import { AnimatedLogo } from '@/components/ui/AnimatedLogo';
import { FeaturesSection } from '@/components/ui/FeaturesSection';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

export default function Index() {
  const [isVisible, setIsVisible] = useState(false);
  const parallax = useParallax(0.02);
  const heroImageRef = useRef<HTMLDivElement>(null);
  
  // Hero section animations
  const heroReveal = useReveal();
  const heroSubtitleReveal = useReveal();
  const heroCTAReveal = useReveal();
  
  // How it works section
  const howItWorksReveal = useReveal();
  
  // Typewriter effect for the hero section
  const { displayedText } = useTypewriter(
    'Remote connection, reimagined.',
    100,
    1000
  );
  
  // Floating effect for hero image
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  // Stats data
  const stats = [
    { value: '99.9%', label: 'Uptime' },
    { value: '15ms', label: 'Average Latency' },
    { value: '256-bit', label: 'Encryption' },
    { value: '24/7', label: 'Support' },
  ];
  
  // How it works steps
  const steps = [
    {
      icon: Monitor,
      title: 'Install & Configure',
      description: 'Download and install Cozy Connect on your computers. Setup takes less than 5 minutes with our guided wizard.'
    },
    {
      icon: Shield,
      title: 'Secure & Protect',
      description: 'Set up your security preferences and access controls. Your connection is protected with enterprise-grade encryption.'
    },
    {
      icon: Clock,
      title: 'Connect Anytime',
      description: 'Access your remote computers from anywhere, anytime. No complicated port forwarding or network configuration required.'
    },
    {
      icon: Smartphone,
      title: 'Cross-Device Access',
      description: 'Control your desktops from any device including smartphones and tablets with our native mobile applications.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
              <div 
                ref={heroReveal.ref}
                className={cn(
                  'transition-all duration-1000 delay-300',
                  !heroReveal.isRevealed && 'opacity-0 -translate-x-12',
                  heroReveal.isRevealed && 'opacity-100 translate-x-0'
                )}
              >
                <h1 className="font-bold tracking-tight text-gray-900 mb-6">
                  {displayedText}
                </h1>
              </div>
              
              <div
                ref={heroSubtitleReveal.ref}
                className={cn(
                  'transition-all duration-1000 delay-500',
                  !heroSubtitleReveal.isRevealed && 'opacity-0 -translate-x-12',
                  heroSubtitleReveal.isRevealed && 'opacity-100 translate-x-0'
                )}
              >
                <p className="text-xl md:text-2xl text-gray-600 mb-8 md:pr-12">
                  Connect to your desktops from anywhere with uncompromising security, speed, and simplicity.
                </p>
              </div>
              
              <div
                ref={heroCTAReveal.ref}
                className={cn(
                  'flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 transition-all duration-1000 delay-700',
                  !heroCTAReveal.isRevealed && 'opacity-0 -translate-y-8',
                  heroCTAReveal.isRevealed && 'opacity-100 translate-y-0'
                )}
              >
                <Button asChild size="lg" className="rounded-full">
                  <Link to="/connect">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                
                <Button variant="outline" size="lg" className="rounded-full">
                  <Link to="/dashboard">View Demo</Link>
                </Button>
              </div>
              
              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={cn(
                      'text-center transition-all duration-700',
                      !heroCTAReveal.isRevealed && 'opacity-0 translate-y-8',
                      heroCTAReveal.isRevealed && 'opacity-100 translate-y-0'
                    )}
                    style={{ transitionDelay: `${800 + index * 100}ms` }}
                  >
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div 
              className="w-full lg:w-1/2 flex justify-center lg:justify-end"
              style={{
                transform: `translate(${parallax.x * 0.05}px, ${parallax.y * 0.05}px)`,
              }}
            >
              <div 
                ref={heroImageRef}
                className={cn(
                  'relative w-full max-w-md lg:max-w-lg transition-all duration-1000',
                  !isVisible && 'opacity-0 scale-95',
                  isVisible && 'opacity-100 scale-100'
                )}
              >
                {/* Main Hero Image */}
                <div className="neo-morphism rounded-xl overflow-hidden shadow-2xl">
                  {/* This would be replaced with an actual hero image */}
                  <div className="aspect-video w-full bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center">
                    <div className="flex flex-col items-center">
                      <AnimatedLogo size="xl" />
                      <p className="mt-4 text-gray-600">Remote Desktop Display</p>
                    </div>
                  </div>
                </div>
                
                {/* Decorative floating elements */}
                <div 
                  className="absolute -top-6 -right-6 h-16 w-32 glass-morphism rounded-lg animate-float"
                  style={{ animationDelay: '0.2s' }}
                >
                  <div className="h-full w-full flex items-center justify-center">
                    <p className="text-sm font-medium">Connected</p>
                  </div>
                </div>
                
                <div 
                  className="absolute -bottom-4 -left-4 h-20 w-20 glass-morphism rounded-lg animate-float"
                  style={{ animationDelay: '0.5s' }}
                >
                  <div className="h-full w-full flex items-center justify-center">
                    <Shield className="h-8 w-8 text-gray-700" />
                  </div>
                </div>
                
                <div 
                  className="absolute top-1/2 -right-12 transform -translate-y-1/2 h-24 w-24 glass-morphism rounded-lg animate-float"
                  style={{ animationDelay: '0.7s' }}
                >
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-xl font-bold">15ms</p>
                      <p className="text-xs text-gray-600">Latency</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="flex justify-center mt-16">
          <a
            href="#features"
            className="flex flex-col items-center text-gray-500 hover:text-gray-900 transition-colors"
          >
            <span className="text-sm mb-2">Explore Features</span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </a>
        </div>
      </section>
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* How It Works Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div 
            ref={howItWorksReveal.ref}
            className={cn(
              'max-w-2xl mx-auto text-center mb-16 transition-all duration-700',
              !howItWorksReveal.isRevealed && 'opacity-0 translate-y-8',
              howItWorksReveal.isRevealed && 'opacity-100 translate-y-0'
            )}
          >
            <h2 className="mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">
              Simple, secure, and intuitive. Get connected in minutes with our streamlined process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div 
                  key={step.title}
                  className={cn(
                    'text-center transition-all duration-700',
                    !howItWorksReveal.isRevealed && 'opacity-0 translate-y-12',
                    howItWorksReveal.isRevealed && 'opacity-100 translate-y-0'
                  )}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="mb-6 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-900">
                    <StepIcon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-medium mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto glass-morphism rounded-2xl overflow-hidden border border-gray-200">
            <div className="p-8 md:p-12 text-center">
              <h2 className="mb-4">Ready to Experience the Difference?</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto">
                Join thousands of professionals who trust Cozy Connect for secure, seamless remote desktop access.
              </p>
              <Button asChild size="lg" className="rounded-full">
                <Link to="/connect">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
