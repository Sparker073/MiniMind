import { motion } from 'framer-motion';
import { Brain, Sparkles, BookOpen, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

const Discovery = () => {
  return (
    <div className="min-h-screen neural-bg flex flex-col items-center justify-center px-4 sm:px-8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-3xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* AI Icon */}
        <motion.div
          className="mb-8 relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-primary/10 flex items-center justify-center glow-primary">
            <Brain className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
          </div>
          <motion.div
            className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-secondary" />
          </motion.div>
        </motion.div>

        {/* Welcome text */}
        <motion.h1
          className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gradient-neural mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Welcome to AI Discovery
        </motion.h1>

        <motion.p
          className="font-inter text-muted-foreground text-base sm:text-lg md:text-xl mb-8 sm:mb-12 leading-relaxed px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          You've taken the first step into understanding artificial intelligence. 
          This space will be your guide to exploring how machines learn, think, and create.
        </motion.p>

        {/* Feature cards placeholder */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="p-4 sm:p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-primary/50 transition-colors cursor-pointer group">
            <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-orbitron text-sm sm:text-base text-foreground mb-2">Learn the Basics</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">Start with fundamental AI concepts</p>
          </div>

          <div className="p-4 sm:p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-secondary/50 transition-colors cursor-pointer group">
            <Lightbulb className="w-6 h-6 sm:w-8 sm:h-8 text-secondary mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-orbitron text-sm sm:text-base text-foreground mb-2">Explore Ideas</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">Discover AI applications in real life</p>
          </div>
        </motion.div>

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 sm:mt-12"
        >
          <Link
            to="/"
            className="font-inter text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
          >
            <motion.span
              animate={{ x: [-3, 0, -3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ←
            </motion.span>
            Return to the beginning
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Discovery;
