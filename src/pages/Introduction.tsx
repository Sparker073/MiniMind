import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, Brain, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import DiveAnimation from '@/components/DiveAnimation';
import NeuralBackground from '@/components/NeuralBackground';

const Discovery = () => {
  const navigate = useNavigate();
  const [isDiving, setIsDiving] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  const handleDive = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setClickPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    });
    setIsDiving(true);
    setTimeout(() => navigate('/wheelpage'), 1500);
  }, [navigate]);

  return (
    <div className="min-h-screen neural-bg relative overflow-hidden">
      <NeuralBackground />
      
      {/* Animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(124, 58, 237, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 80%, rgba(124, 58, 237, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(124, 58, 237, 0.1) 0%, transparent 50%)',
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          className="p-4 sm:p-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors font-inter text-sm group"
          >
            <motion.span 
              className="group-hover:text-primary transition-colors"
              animate={{ x: [-2, 2, -2] }} 
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ←
            </motion.span>
            Back
          </Link>
        </motion.header>

        {/* Main content */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 pb-16">
          <motion.div
            className={`max-w-4xl w-full text-center transition-opacity duration-500 ${isDiving ? 'opacity-0' : 'opacity-100'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isDiving ? 0 : 1 }}
          >
            {/* Floating icons */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute top-20 left-10 text-primary/20"
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
              </motion.div>
              <motion.div
                className="absolute top-40 right-20 text-secondary/20"
                animate={{ 
                  y: [0, 20, 0],
                  rotate: [0, -10, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              >
              </motion.div>
              <motion.div
                className="absolute bottom-40 left-20 text-primary/20"
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 15, 0]
                }}
                transition={{ duration: 4.5, repeat: Infinity, delay: 0.5 }}
              >
                <Zap className="w-8 h-8" />
              </motion.div>
            </div>

            {/* Title with staggered animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <motion.h1
                className="font-orbitron text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-gradient-neural mb-6 leading-tight"
              >
                What is AI,
                <br />
                <motion.span
                  className="inline-block"
                  animate={{ 
                    textShadow: [
                      '0 0 20px rgba(124, 58, 237, 0.3)',
                      '0 0 40px rgba(124, 58, 237, 0.5)',
                      '0 0 20px rgba(124, 58, 237, 0.3)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Really?
                </motion.span>
              </motion.h1>
            </motion.div>

            {/* Interactive description */}
            <motion.div
              className="mb-12 space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.p
                className="font-inter text-lg sm:text-xl md:text-2xl text-foreground/90 leading-relaxed max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                It's not magic. It's not sentient. It's{' '}
                <motion.span
                  className="text-primary font-semibold cursor-pointer inline-block"
                  whileHover={{ scale: 1.1, textShadow: '0 0 20px rgba(124, 58, 237, 0.6)' }}
                  onHoverStart={() => setHoveredWord('patterns')}
                  onHoverEnd={() => setHoveredWord(null)}
                >
                  patterns
                </motion.span>
                ,{' '}
                <motion.span
                  className="text-secondary font-semibold cursor-pointer inline-block"
                  whileHover={{ scale: 1.1, textShadow: '0 0 20px rgba(59, 130, 246, 0.6)' }}
                  onHoverStart={() => setHoveredWord('math')}
                  onHoverEnd={() => setHoveredWord(null)}
                >
                  math
                </motion.span>
                , and{' '}
                <motion.span
                  className="text-primary font-semibold cursor-pointer inline-block"
                  whileHover={{ scale: 1.1, textShadow: '0 0 20px rgba(124, 58, 237, 0.6)' }}
                  onHoverStart={() => setHoveredWord('learning')}
                  onHoverEnd={() => setHoveredWord(null)}
                >
                  learning
                </motion.span>
                {' '}working together.
              </motion.p>

              {/* Hover hint text */}
            
            </motion.div>

            {/* Stats/Facts section */}
            <motion.div
              className="mb-16 flex flex-wrap justify-center gap-8 sm:gap-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              {[
                { label: 'You\'ll learn by', value: 'doing', color: 'text-primary' },
                { label: 'No boring', value: 'theory', color: 'text-secondary' },
                { label: 'Just pure', value: 'hands-on', color: 'text-primary' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`font-orbitron text-2xl sm:text-3xl ${item.color} mb-1`}>
                    {item.value}
                  </div>
                  <div className="text-xs sm:text-sm text-foreground/60 font-inter">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Promise section */}
            <motion.div
              className="mb-12 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-3xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <p className="relative font-inter text-base sm:text-lg text-foreground/80 leading-relaxed max-w-2xl mx-auto py-8">
                By the time you're done exploring, AI will stop feeling like{' '}
                <span className="line-through text-foreground/40">mysterious tech magic</span>
                {' '}and start feeling like a{' '}
                <span className="text-primary font-semibold">superpower you actually understand</span>.
              </p>
            </motion.div>

            {/* Call to action */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
              className="relative"
            >
              {/* Animated ring around button */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-full h-full rounded-full border-2 border-primary/50" />
              </motion.div>

              <motion.button
                onClick={handleDive}
                className="relative group px-12 py-6 rounded-full bg-gradient-to-r from-primary/30 via-primary/20 to-secondary/30 border-2 border-primary/60 hover:border-primary transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Button background glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />

                <span className="relative font-orbitron text-base sm:text-lg text-foreground flex items-center gap-3 font-medium">
                  Start Exploring
                  <motion.span
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ChevronDown className="w-6 h-6 text-primary" />
                  </motion.span>
                </span>

                {/* Hover particles effect */}
                <motion.div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                >
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-primary rounded-full"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: '50%'
                      }}
                      animate={{
                        y: [-20, -40, -20],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.1
                      }}
                    />
                  ))}
                </motion.div>
              </motion.button>

              <motion.p
                className="mt-6 text-sm text-foreground/50 font-inter"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7 }}
              >
                No signup. No theory. Just pure exploration. 
              </motion.p>
            </motion.div>
          </motion.div>
        </main>

        {/* Bottom decoration */}
        <motion.div
          className="pb-8 flex justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary/40"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Dive Animation */}
      <DiveAnimation isActive={isDiving} clickPosition={clickPosition} />
    </div>
  );
};

export default Discovery;