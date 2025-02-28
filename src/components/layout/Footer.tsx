
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { AnimatedLogo } from '@/components/ui/AnimatedLogo';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    product: [
      { label: 'Features', href: '#features' },
      { label: 'Security', href: '#security' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Resources', href: '#resources' },
    ],
    company: [
      { label: 'About Us', href: '#about' },
      { label: 'Careers', href: '#careers' },
      { label: 'Blog', href: '#blog' },
      { label: 'Contact', href: '#contact' },
    ],
    support: [
      { label: 'Help Center', href: '#help' },
      { label: 'Documentation', href: '#docs' },
      { label: 'Status', href: '#status' },
      { label: 'Updates', href: '#updates' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Service', href: '#terms' },
      { label: 'Cookie Policy', href: '#cookies' },
      { label: 'Compliance', href: '#compliance' },
    ],
  };
  
  const socialLinks = [
    { icon: Github, href: '#github', label: 'GitHub' },
    { icon: Twitter, href: '#twitter', label: 'Twitter' },
    { icon: Linkedin, href: '#linkedin', label: 'LinkedIn' },
  ];
  
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <AnimatedLogo size="sm" />
              <span className="font-medium text-lg">Cozy Connect</span>
            </Link>
            <p className="text-gray-600 mb-6 max-w-md">
              Secure, seamless remote desktop connections. Connect to your devices from anywhere with enterprise-grade security and unmatched simplicity.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
          
          {/* Links */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:col-span-3">
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Product</h3>
              <ul className="space-y-2">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© {currentYear} Cozy Connect. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Crafted with precision. Designed with care.
          </p>
        </div>
      </div>
    </footer>
  );
}
