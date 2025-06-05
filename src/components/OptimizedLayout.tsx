import { useState, useCallback } from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminLogin from '@/components/AdminLogin';

interface OptimizedLayoutProps {
  children: React.ReactNode;
}

interface NavLinkItem {
  label: string;
  path: string;
}

const navLinks: NavLinkItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Skills', path: '/skills' },
  { label: 'Projects', path: '/projects' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
];

export default function OptimizedLayout({ children }: OptimizedLayoutProps) {
  const [loading, setLoading] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = useCallback((path: string) => {
    setLoading(true);
    navigate(path);
  }, [navigate]);

  const handleLogoClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div 
              className="w-14 h-14 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"
              style={{ borderWidth: '4px' }}
            />
            <p className="text-slate-700 font-medium text-base">Loading...</p>
          </div>
        </div>
      )}

      <header className="border-b sticky top-0 bg-white/95 backdrop-blur z-10 text-slate-700 shadow-lg shadow-slate-200/50 border-slate-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
            aria-label="Home"
          >
            <img 
              src="/profileimages/2pallogo.png" 
              alt="Logo" 
              className="h-8 w-8 rounded-full object-cover border-2 border-blue-200"
              width={32}
              height={32}
              loading="lazy"
            />
            <span className="font-bold text-xl font-fira text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hidden sm:inline">
              MS.dev
            </span>
          </button>

          {/* Desktop Navigation - Always visible on desktop, hidden on mobile */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className="nav-link flex items-center gap-2 hover:text-blue-600 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Social Links - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="Github">
              <Github className="w-5 h-5 hover:text-blue-600 transition-colors" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5 hover:text-blue-600 transition-colors" />
            </a>
            <a href="mailto:contact@example.com" aria-label="Email">
              <Mail className="w-5 h-5 hover:text-blue-600 transition-colors" />
            </a>
          </div>

        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t py-8 bg-white/80 border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <img
                src="/profileimages/2pallogo.png"
                alt="Logo"
                className="h-8 w-8 rounded-full object-cover border-2 border-blue-200"
                width={32}
                height={32} />
              <span className="text-sm font-medium text-slate-700"> {new Date().getFullYear()} MS.dev</span>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-slate-700 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-slate-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@example.com"
                className="text-slate-500 hover:text-slate-700 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
