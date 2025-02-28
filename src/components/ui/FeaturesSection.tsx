
import { useRef } from 'react';
import { 
  Shield, 
  Zap, 
  Monitor, 
  Smartphone, 
  RefreshCw, 
  Lock,
  Fingerprint,
  Layers,
  Clock,
  Cpu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useReveal, useStaggeredReveal } from '@/utils/animations';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
  isVisible: boolean;
}

function FeatureCard({ icon: Icon, title, description, index, isVisible }: FeatureCardProps) {
  return (
    <div
      className={cn(
        'glass-morphism p-6 rounded-xl group transition-all duration-500 hover-lift',
        !isVisible && 'opacity-0 translate-y-8',
        isVisible && 'opacity-100 translate-y-0'
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-xl font-medium">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: 'Enterprise-Grade Security',
      description: 'End-to-end encryption with multiple layers of protection for your most sensitive data and connections.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance ensures minimal latency and smooth experience, even on slower networks.'
    },
    {
      icon: Monitor,
      title: 'Multi-Monitor Support',
      description: 'Seamlessly work across all your displays with full support for multi-monitor setups.'
    },
    {
      icon: Fingerprint,
      title: 'Biometric Authentication',
      description: 'Use fingerprint or face recognition for quick and secure access to your remote connections.'
    },
    {
      icon: Smartphone,
      title: 'Cross-Platform',
      description: 'Connect from any device – desktop, laptop, tablet, or smartphone – with native applications.'
    },
    {
      icon: RefreshCw,
      title: 'Auto-Reconnect',
      description: 'Never lose your session with intelligent reconnection that preserves your work.'
    },
    {
      icon: Layers,
      title: 'Session Management',
      description: 'Organize and switch between multiple remote sessions with intuitive controls.'
    },
    {
      icon: Lock,
      title: 'Secure File Transfer',
      description: 'Transfer files between local and remote systems with encrypted, verified transfers.'
    },
    {
      icon: Clock,
      title: 'Scheduled Access',
      description: 'Schedule connections in advance and set time limits for controlled access periods.'
    },
    {
      icon: Cpu,
      title: 'Resource Optimization',
      description: 'Intelligent resource allocation ensures optimal performance on any hardware.'
    },
  ];
  
  const { containerRef, visibleItems } = useStaggeredReveal(features.length);
  const titleReveal = useReveal();
  
  return (
    <section className="section-padding" id="features">
      <div className="container mx-auto px-4">
        <div 
          ref={titleReveal.ref} 
          className={cn(
            'max-w-2xl mx-auto text-center mb-12 md:mb-16 transition-all duration-700',
            !titleReveal.isRevealed && 'opacity-0 translate-y-8',
            titleReveal.isRevealed && 'opacity-100 translate-y-0'
          )}
        >
          <h2 className="mb-4">Powerful Features, Effortless Experience</h2>
          <p className="text-xl text-gray-600">
            Designed with meticulous attention to detail, our remote desktop solution combines powerful capabilities with elegant simplicity.
          </p>
        </div>
        
        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
              isVisible={visibleItems[index]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
