
import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import OptimizedLayout from '@/components/OptimizedLayout';

// Lazy load page components for better performance
const Index = lazy(() => import('./pages/Index'));
const About = lazy(() => import('./pages/About'));
const Skills = lazy(() => import('./pages/Skills'));
const Projects = lazy(() => import('./pages/Projects'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const Admin = lazy(() => import('./pages/Admin'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Initialize query client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Loading component for lazy loading
const LoadingFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
    <div className="w-12 h-12 min-w-[3rem] min-h-[3rem] border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
  </div>
);

// Component for handling page transitions
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  // Reset scroll position when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      >
        <Suspense fallback={<LoadingFallback />}>
          {children}
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
};

// Main application component
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <OptimizedLayout>
            <Routes>
              <Route path="/" element={
                <PageTransition>
                  <Index />
                </PageTransition>
              } />
              <Route path="/about" element={
                <PageTransition>
                  <About />
                </PageTransition>
              } />
              <Route path="/skills" element={
                <PageTransition>
                  <Skills />
                </PageTransition>
              } />
              <Route path="/projects" element={
                <PageTransition>
                  <Projects />
                </PageTransition>
              } />
              <Route path="/gallery" element={
                <PageTransition>
                  <Gallery />
                </PageTransition>
              } />
              <Route path="/contact" element={
                <PageTransition>
                  <Contact />
                </PageTransition>
              } />
              <Route path="/admin" element={
                <PageTransition>
                  <Admin />
                </PageTransition>
              } />
              <Route path="*" element={
                <PageTransition>
                  <NotFound />
                </PageTransition>
              } />
            </Routes>
            <Toaster />
            <Sonner position="top-right" />
          </OptimizedLayout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
