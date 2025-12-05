import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import NeuralBackground from '@/components/NeuralBackground';

const Explore = () => {
  return (
    <div className="min-h-screen neural-bg relative overflow-hidden">
      <NeuralBackground />
      
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/80 pointer-events-none" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="mb-8"
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-primary/10 flex items-center justify-center mx-auto glow-primary">
              <Compass className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
            </div>
          </motion.div>

          <motion.h1
            className="font-orbitron text-2xl sm:text-4xl text-gradient-neural mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            You've Arrived
          </motion.h1>

          <motion.p
            className="font-inter text-muted-foreground text-base sm:text-lg max-w-md mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            This is where your AI learning journey begins. Content coming soon...
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Link
              to="/discovery"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-inter"
            >
              <motion.span animate={{ x: [-2, 2, -2] }} transition={{ duration: 1.5, repeat: Infinity }}>
                ←
              </motion.span>
              Back to Discovery
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Explore;
