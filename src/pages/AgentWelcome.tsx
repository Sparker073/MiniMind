import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
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

      <div className="relative z-10 flex flex-col items-center">
        {/* Robot Container */}
        <motion.div
          className="relative cursor-pointer"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
          onClick={handleContinue}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Speech Bubble */}
          <motion.div
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-72 sm:w-80"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 150 }}
          >
            <div className="relative bg-card/80 backdrop-blur-md border border-primary/30 rounded-2xl p-4 sm:p-5 shadow-lg shadow-primary/10">
              <p className="font-orbitron text-sm sm:text-base text-foreground text-center leading-relaxed">
                Welcome to the universe of{" "}
                <span className="text-primary font-bold">Agentic AI</span>
              </p>
              <motion.p
                className="text-xs text-muted-foreground text-center mt-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Click me to continue →
              </motion.p>
              {/* Bubble pointer */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-card/80 border-r border-b border-primary/30 rotate-45" />
            </div>
          </motion.div>

          {/* Robot Body */}
          <motion.div
            className="relative w-40 h-48 sm:w-48 sm:h-56"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl scale-150" />
            
            {/* Head */}
            <motion.div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-b from-muted to-muted/80 rounded-2xl border-2 border-primary/40 shadow-lg shadow-primary/20"
            >
              {/* Antenna */}
              <motion.div 
                className="absolute -top-6 left-1/2 -translate-x-1/2 w-1 h-6 bg-primary/60"
                animate={{ scaleY: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <motion.div 
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary"
                  animate={{ 
                    boxShadow: [
                      "0 0 10px hsl(var(--primary))",
                      "0 0 25px hsl(var(--primary))",
                      "0 0 10px hsl(var(--primary))"
                    ]
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.div>
              
              {/* Eyes */}
              <div className="absolute top-6 sm:top-8 left-1/2 -translate-x-1/2 flex gap-4 sm:gap-5">
                <motion.div 
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 0 15px hsl(var(--primary))",
                      "0 0 30px hsl(var(--primary))",
                      "0 0 15px hsl(var(--primary))"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div 
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 0 15px hsl(var(--primary))",
                      "0 0 30px hsl(var(--primary))",
                      "0 0 15px hsl(var(--primary))"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                />
              </div>
              
              {/* Mouth */}
              <motion.div 
                className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 w-8 h-2 bg-primary/60 rounded-full"
                animate={{ scaleX: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>

            {/* Body */}
            <div className="absolute top-24 sm:top-28 left-1/2 -translate-x-1/2 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-b from-muted to-muted/70 rounded-xl border-2 border-primary/30">
              {/* Chest light */}
              <motion.div 
                className="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center"
                animate={{ 
                  backgroundColor: ["hsl(var(--primary) / 0.2)", "hsl(var(--primary) / 0.4)", "hsl(var(--primary) / 0.2)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div 
                  className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-primary"
                  animate={{ scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.div>
            </div>

            {/* Arms */}
            <motion.div 
              className="absolute top-28 sm:top-32 -left-2 sm:-left-3 w-4 h-12 sm:w-5 sm:h-14 bg-muted rounded-full border border-primary/30"
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              className="absolute top-28 sm:top-32 -right-2 sm:-right-3 w-4 h-12 sm:w-5 sm:h-14 bg-muted rounded-full border border-primary/30"
              animate={{ rotate: [5, -5, 5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-16"
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
    </div>
  );
};

export default AgentWelcome;
