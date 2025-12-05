import { NetworkBackground } from '../components/NetworkBackground';
import { AIWheel } from '../components/AIWheel';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <NetworkBackground />
      
      {/* Gradient Overlays */}
      <div
        className="fixed inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none"
        style={{ zIndex: 1 }}
      />
      <div
        className="fixed inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Back to home button (top-left) */}
      <button
        onClick={() => navigate('/introduction')}
        className="absolute top-4 left-4 z-20 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg
                   bg-background/80 border border-primary/60 text-muted-foreground
                   hover:bg-primary hover:text-primary-foreground hover:border-primary
                   transition-all duration-300"
      >
        ← Back to Home
      </button>

      {/* Content */}
      <main className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <nav className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="font-display text-sm sm:text-base text-primary text-glow-subtle tracking-widest">
              AI_EXPLORE
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
          {/* Title Section */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 animate-fade-in-up">
            <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6 sm:mb-8" />
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6 leading-tight">
              <span className="text-foreground">Discover your next </span>
              <span className="gradient-text text-glow">AI superpower</span>
              <br className="hidden sm:block" />
              <span className="gradient-text text-glow">with a spin</span>
            </h1>
            
            <p className="text-xs sm:text-sm text-muted-foreground/70">
              Explore the world of artificial intelligence in a simple and interactive way.
            </p>
          </div>

          {/* Interactive Wheel */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <AIWheel />
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-xl mx-auto mb-2">
              Not your pick? Spin again and change your AI fate.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-muted-foreground/50">
            <span>© 2025 AI Explorer</span>
            <span className="hidden sm:inline">Learn AI while having fun</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default NotFound;
