import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Sparkles, Stars, Rocket } from 'lucide-react';
import NeuralBackground from '@/components/NeuralBackground';
import DiveAnimation from '@/components/DiveAnimation';

const AgentWelcome = () => {
  const navigate = useNavigate();
  const [isDiving, setIsDiving] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  const handleContinue = (e: React.MouseEvent) => {
    setClickPosition({ x: e.clientX, y: e.clientY });
    setIsDiving(true);
    setTimeout(() => navigate('/explore'), 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <NeuralBackground />
      <DiveAnimation isActive={isDiving} clickPosition={clickPosition} />

      {/* Floating decorations */}
      <motion.div
        className="absolute top-20 left-10 text-primary/40"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Stars className="w-8 h-8" />
      </motion.div>
      <motion.div
        className="absolute top-40 right-20 text-secondary/40"
        animate={{ y: [0, 15, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Sparkles className="w-10 h-10" />
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-20 text-primary/30"
        animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <Rocket className="w-6 h-6 rotate-45" />
      </motion.div>

      {/* Main content - Speech bubble left, Robot right */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 px-4 max-w-4xl w-full">
        
        {/* Speech Bubble - Left side */}
        <motion.div
          className="order-2 sm:order-1 flex-1 max-w-sm cursor-pointer"
          initial={{ opacity: 0, x: -50, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 150 }}
          onClick={handleContinue}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <div className="relative bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-md border-2 border-primary/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-primary/20">
            {/* Decorative corner sparkles */}
            <motion.div
              className="absolute -top-2 -left-2"
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5 text-primary" />
            </motion.div>
            
            <motion.h2
              className="font-orbitron text-xl sm:text-2xl text-foreground text-center mb-3"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🚀 Welcome to the
            </motion.h2>
            <motion.p
              className="font-orbitron text-2xl sm:text-3xl text-center mb-4"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Universe of Agentic AI
            </motion.p>
            <p className="text-sm sm:text-base text-muted-foreground text-center mb-4">
              Ready to explore how AI agents think and learn?
            </p>
            
            <motion.div
              className="flex items-center justify-center gap-2 text-primary font-medium"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span>Click to dive in</span>
              <span className="text-xl">→</span>
            </motion.div>

            {/* Bubble pointer - pointing right toward robot */}
            <div className="hidden sm:block absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-card/90 to-card/70 border-r-2 border-t-2 border-primary/40 rotate-45" />
          </div>
        </motion.div>

        {/* Robot - Right side, waving bye-bye */}
        <motion.div
          className="order-1 sm:order-2 relative cursor-pointer"
          initial={{ scale: 0, rotate: 10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
          onClick={handleContinue}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            className="relative w-44 h-56 sm:w-52 sm:h-64"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Big glow effect */}
            <motion.div 
              className="absolute inset-0 bg-primary/30 rounded-full blur-3xl scale-150"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Head */}
            <motion.div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-b from-muted to-muted/80 rounded-3xl border-3 border-primary/50 shadow-xl shadow-primary/30"
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* Antenna */}
              <motion.div 
                className="absolute -top-8 left-1/2 -translate-x-1/2 w-1.5 h-8 bg-gradient-to-t from-primary/60 to-primary"
                animate={{ scaleY: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <motion.div 
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary"
                  animate={{ 
                    scale: [1, 1.4, 1],
                    boxShadow: [
                      "0 0 15px hsl(var(--primary))",
                      "0 0 35px hsl(var(--primary))",
                      "0 0 15px hsl(var(--primary))"
                    ]
                  }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </motion.div>
              
              {/* Happy eyes - curved like smiling */}
              <div className="absolute top-8 sm:top-10 left-1/2 -translate-x-1/2 flex gap-6 sm:gap-7">
                <motion.div 
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary relative overflow-hidden"
                  animate={{ 
                    scale: [1, 1.15, 1],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {/* Eye shine */}
                  <div className="absolute top-1 right-1 w-2 h-2 bg-white/60 rounded-full" />
                </motion.div>
                <motion.div 
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary relative overflow-hidden"
                  animate={{ 
                    scale: [1, 1.15, 1],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                >
                  <div className="absolute top-1 right-1 w-2 h-2 bg-white/60 rounded-full" />
                </motion.div>
              </div>
              
              {/* Big happy smile */}
              <motion.div 
                className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 w-12 h-6 border-b-4 border-primary rounded-b-full"
                animate={{ scaleX: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              
              {/* Blush cheeks */}
              <div className="absolute top-14 sm:top-16 left-2 w-4 h-2 bg-pink-400/40 rounded-full blur-sm" />
              <div className="absolute top-14 sm:top-16 right-2 w-4 h-2 bg-pink-400/40 rounded-full blur-sm" />
            </motion.div>

            {/* Body */}
            <div className="absolute top-28 sm:top-32 left-1/2 -translate-x-1/2 w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-b from-muted to-muted/70 rounded-2xl border-2 border-primary/40 shadow-lg">
              {/* Chest display */}
              <motion.div 
                className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-10 sm:w-16 sm:h-12 rounded-xl bg-background/50 border-2 border-primary/50 flex items-center justify-center overflow-hidden"
              >
                <motion.div
                  className="text-2xl"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  💜
                </motion.div>
              </motion.div>
            </div>

            {/* Left arm (static) */}
            <motion.div 
              className="absolute top-32 sm:top-36 -left-1 sm:-left-2 w-5 h-14 sm:w-6 sm:h-16 bg-muted rounded-full border-2 border-primary/40 origin-top"
              animate={{ rotate: [-8, 8, -8] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Right arm (waving bye-bye!) */}
            <motion.div 
              className="absolute top-28 sm:top-32 -right-6 sm:-right-8 origin-top-left"
              animate={{ rotate: [-20, 30, -20] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <div className="w-5 h-12 sm:w-6 sm:h-14 bg-muted rounded-full border-2 border-primary/40" />
              {/* Hand */}
              <motion.div 
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 sm:w-9 sm:h-9 bg-muted rounded-full border-2 border-primary/40 flex items-center justify-center"
                animate={{ rotate: [-30, 30, -30] }}
                transition={{ duration: 0.3, repeat: Infinity }}
              >
                <span className="text-lg">👋</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* "Bye bye!" floating text */}
          <motion.div
            className="absolute -top-4 -right-4 sm:-right-8"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, y: [0, -5, 0] }}
            transition={{ delay: 1.2, duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
          >
            <span className="font-orbitron text-sm sm:text-base text-primary font-bold bg-card/80 px-3 py-1 rounded-full border border-primary/40">
              Bye bye! 👋
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Back link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={() => navigate('/discovery')}
          className="font-inter text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
        >
          <motion.span
            animate={{ x: [-3, 0, -3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ←
          </motion.span>
          Back to Discovery
        </button>
      </motion.div>
    </div>
  );
};

export default AgentWelcome;
