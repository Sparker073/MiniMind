import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import NeuralBackground from '@/components/NeuralBackground';
import CentralText from '@/components/CentralText';
import DiveAnimation from '@/components/DiveAnimation';

const Index = () => {
  const navigate = useNavigate();
  const [isDiving, setIsDiving] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isDiving) return;
    
    setClickPosition({ x: e.clientX, y: e.clientY });
    setIsDiving(true);

    // Navigate after animation completes
    setTimeout(() => {
      navigate('/discovery');
    }, 1800);
  }, [isDiving, navigate]);

  return (
    <>
      <motion.div
        className="min-h-screen neural-bg flex items-center justify-center cursor-pointer overflow-hidden relative"
        onClick={handleClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Neural network background */}
        <NeuralBackground />

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/30 to-background pointer-events-none" />

        {/* Central content */}
        <AnimatePresence>
          {!isDiving && <CentralText />}
        </AnimatePresence>

        {/* Corner decorations */}
        <motion.div
          className="absolute top-4 left-4 sm:top-8 sm:left-8 text-primary/30 font-orbitron text-xs tracking-widest"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 }}
        >
          AI_EXPLORE
        </motion.div>

        <motion.div
          className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 text-primary/30 font-orbitron text-xs tracking-widest"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.2 }}
        >
          v1.0_DISCOVERY
        </motion.div>

        {/* Side decorative lines */}
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-12 sm:w-20 h-px bg-gradient-to-r from-primary/50 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        />
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-12 sm:w-20 h-px bg-gradient-to-l from-primary/50 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        />
      </motion.div>

      {/* Dive animation overlay */}
      <DiveAnimation isActive={isDiving} clickPosition={clickPosition} />
    </>
  );
};

export default Index;
