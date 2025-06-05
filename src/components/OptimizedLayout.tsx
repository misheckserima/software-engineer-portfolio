import { useState, useCallback } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Menu, X, Github, Linkedin, Mail, GalleryHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminLogin from '@/components/AdminLogin';

type LayoutProps = {
  children: React.ReactNode;
};

const OptimizedLayout = ({ children }: LayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Home', path: '/', icon: null },
    { label: 'About', path: '/about', icon: null },
    { label: 'Skills', path: '/skills', icon: null },
    { label: 'Projects', path: '/projects', icon: null },
    { label: 'Gallery', path: '/gallery', icon: GalleryHorizontal },
    { label: 'Contact', path: '/contact', icon: null },
  ];

  const handleLogoClick = useCallback(() => {
    setShowAdminLogin(true);
  }, []);

  const handleAdminLoginSuccess = useCallback(() => {
    navigate('/admin');
  }, [navigate]);

  const handleNavClick = useCallback((path: string) => {
    setLoading(true);
    setTimeout(() => {
      navigate(path);
      setLoading(false);
      setMobileMenuOpen(false);
    }, 300); // Reduced from 1500ms to 300ms for better UX
  }, [navigate]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-gray-100 relative ${
      mobileMenuOpen ? 'overflow-hidden h-screen' : ''
    }`}>
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
                {link.icon && <link.icon className="w-4 h-4" />}
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

          {/* Mobile menu button - Only show on mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-md border border-slate-200 text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 active:scale-95 z-50"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              style={{
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 50
              }}
            >
              {mobileMenuOpen ? (
                <X size={28} strokeWidth={2.5} className="text-white" />
              ) : (
                <Menu size={28} strokeWidth={2.5} className="text-slate-800" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu overlay with blur effect */}
        <div 
          className={`md:hidden fixed inset-0 bg-black/80 backdrop-blur-md transition-all duration-300 ${
            mobileMenuOpen ? 'opacity-100 z-[100]' : 'opacity-0 -z-50 pointer-events-none'
          }`}
          onClick={toggleMobileMenu}
        />

        {/* Mobile menu */}
        <div 
          className={`md:hidden fixed inset-y-0 left-0 z-[110] bg-white transform ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out flex flex-col w-4/5 max-w-xs`}
          style={{
            WebkitOverflowScrolling: 'touch',
            boxShadow: '4px 0 30px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Menu header with logo and close button */}
          <div className="flex items-center justify-between p-4 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <img 
                src="/profileimages/2pallogo.png" 
                alt="Logo" 
                className="h-8 w-8 rounded-full object-cover border-2 border-blue-200"
                width={32}
                height={32}
              />
              <span className="font-bold text-lg font-fira text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                MS.dev
              </span>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Close menu"
            >
              <X size={24} strokeWidth={2} className="text-slate-600" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto py-4 px-4 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`flex items-center w-full text-left text-base font-medium py-3 px-4 rounded-lg transition-all duration-200 ${
                    window.location.pathname === link.path 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-slate-800 hover:bg-slate-50'
                  }`}
                  style={{
                    minHeight: '48px',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  {Icon && <Icon className="mr-3 h-5 w-5 flex-shrink-0" />}
                  <span className="text-slate-800">{link.label}</span>
                </button>
              );
            })}
            
            {/* Social links at the bottom */}
            <div className="mt-auto pt-6 pb-8 border-t border-slate-100">
              <p className="text-center text-sm text-slate-500 mb-4">Connect with me</p>
              <div className="flex justify-center space-x-8">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 text-slate-600 hover:text-blue-600 transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={22} />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 text-slate-600 hover:text-blue-600 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={22} />
                </a>
                <a 
                  href="mailto:contact@example.com" 
                  className="p-2 text-slate-600 hover:text-blue-600 transition-colors"
                  aria-label="Email"
                >
                  <Mail size={22} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className={`flex-1 transition-opacity duration-300 ${
        mobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        {children}
      </main>

      <footer className="border-t py-8 bg-white/80 border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 flex items-center gap-2">
              <img 
                src="/profileimages/2pallogo.png" 
                alt="Logo" 
                className="h-6 w-6 rounded-full object-cover border border-blue-200"
                width={24}
                height={24}
                loading="lazy"
              />
              <span className="font-fira font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-lg">
                MS.dev
              </span>
              <p className="text-sm text-slate-600 mt-1 ml-4">
                &copy; {new Date().getFullYear()} Misheck Serima. All rights reserved.
              </p>
            </div>
            
            <div className="flex space-x-6 items-center">
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
        </div>
      </footer>

      <AdminLogin 
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
        onSuccess={handleAdminLoginSuccess}
      />
    </div>
  );
};

export default OptimizedLayout;
