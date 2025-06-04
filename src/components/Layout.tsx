import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Github, Linkedin, Mail, GalleryHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminLogin from '@/components/AdminLogin';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Skills', path: '/skills' },
    { label: 'Projects', path: '/projects' },
    { label: 'Gallery', path: '/gallery', icon: GalleryHorizontal },
    { label: 'Contact', path: '/contact' },
  ];

  const handleLogoClick = () => {
    setShowAdminLogin(true);
  };

  const handleAdminLoginSuccess = () => {
    navigate('/admin');
  };

  const handleNavClick = (path: string) => {
    setLoading(true);
    setTimeout(() => {
      navigate(path);
      setLoading(false);
      setMobileMenuOpen(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-slate-600 font-medium">Loading...</p>
          </div>
        </div>
      )}

      <header className="border-b sticky top-0 bg-white/95 backdrop-blur z-10 text-slate-700 shadow-lg shadow-slate-200/50 border-slate-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <img 
              src="/profileimages/2pallogo.png" 
              alt="Logo" 
              className="h-8 w-8 rounded-full object-cover border-2 border-blue-200"
            />
            <span className="font-bold text-xl font-fira text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hidden sm:inline">
              MS.dev
            </span>
          </button>

          {/* Desktop Navigation */}
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
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="Github">
              <Github className="w-5 h-5 hover:text-blue-600 transition-colors" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5 hover:text-blue-600 transition-colors" />
            </a>
            <a href="mailto:contact@example.com" aria-label="Email">
              <Mail className="w-5 h-5 hover:text-blue-600 transition-colors" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:text-blue-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4 animate-fade-in bg-white/95 border-slate-200">
            <div className="container mx-auto px-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className="nav-link flex items-center gap-2 text-lg hover:text-blue-600 transition-colors cursor-pointer text-left"
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.label}
                </button>
              ))}
              
              <div className="flex items-center space-x-5 pt-4">
                <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="Github">
                  <Github className="w-5 h-5 hover:text-blue-600 transition-colors" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5 hover:text-blue-600 transition-colors" />
                </a>
                <a href="mailto:contact@example.com" aria-label="Email">
                  <Mail className="w-5 h-5 hover:text-blue-600 transition-colors" />
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
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
              />
              <span className="font-fira font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-lg">MS.dev</span>
              <p className="text-sm text-slate-600 mt-1 ml-4">
                &copy; {new Date().getFullYear()} Misheck Serima. All rights reserved.
              </p>
            </div>
            
            <div className="flex space-x-6 items-center">
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="Github">
                <Github className="w-5 h-5 hover:text-blue-600 transition-colors" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
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

export default Layout;
