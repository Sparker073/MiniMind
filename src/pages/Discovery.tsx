import { motion } from 'framer-motion';
import { Brain, Sparkles, Cpu, Zap, Bot, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import DiveAnimation from '@/components/DiveAnimation';
import NeuralBackground from '@/components/NeuralBackground';

const Discovery = () => {
  const navigate = useNavigate();
  const [isDiving, setIsDiving] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  const handleDive = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setClickPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    });
    setIsDiving(true);
    setTimeout(() => navigate('/explore'), 1500);
  }, [navigate]);

  const aiConcepts = [
    { icon: Brain, title: "Machine Learning", desc: "Machines learn from data, just like you learn from experience" },
    { icon: Bot, title: "Neural Networks", desc: "Digital brains inspired by your own neurons" },
    { icon: Cpu, title: "Algorithms", desc: "Step-by-step recipes that solve complex puzzles" },
  ];

  return (
    <div className="min-h-screen neural-bg relative overflow-hidden">
      <NeuralBackground />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/80 pointer-events-none" />

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
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-inter text-sm"
          >
            <motion.span animate={{ x: [-2, 2, -2] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ←
            </motion.span>
            Back
          </Link>
        </motion.header>

        {/* Main content */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 pb-8">
          <motion.div
            className={`max-w-4xl w-full text-center transition-opacity duration-500 ${isDiving ? 'opacity-0' : 'opacity-100'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isDiving ? 0 : 1 }}
          >
            {/* Animated icon */}
            <motion.div
              className="mb-6 sm:mb-8 relative inline-block"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 150, delay: 0.3 }}
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center glow-primary rotate-12">
                <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-primary -rotate-12" />
              </div>
              <motion.div
                className="absolute -bottom-1 -right-1"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
              </motion.div>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="font-orbitron text-2xl sm:text-4xl md:text-5xl text-gradient-neural mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              What is AI, Really?
            </motion.h1>

            {/* Introduction text */}
            <motion.p
              className="font-inter text-muted-foreground text-base sm:text-lg md:text-xl mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Imagine teaching a computer to <span className="text-primary font-medium">think</span>, 
              <span className="text-secondary font-medium"> learn</span>, and 
              <span className="text-primary font-medium"> create</span> — that's AI. 
              It's not magic, it's math and patterns working together.
            </motion.p>

            {/* Concept cards */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-14"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {aiConcepts.map((concept, index) => (
                <motion.div
                  key={concept.title}
                  className="group p-5 sm:p-6 rounded-2xl bg-card/30 border border-border/30 backdrop-blur-sm hover:border-primary/40 hover:bg-card/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <concept.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform mx-auto" />
                  <h3 className="font-orbitron text-sm sm:text-base text-foreground mb-2">{concept.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{concept.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Dive deeper button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: "spring" }}
            >
              <motion.button
                onClick={handleDive}
                className="group relative px-8 py-4 sm:px-10 sm:py-5 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/40 hover:border-primary transition-all duration-300 glow-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="font-orbitron text-sm sm:text-base text-foreground flex items-center gap-3">
                  Dive Deeper
                  <motion.span
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ChevronDown className="w-5 h-5 text-primary" />
                  </motion.span>
                </span>
                
                {/* Button glow effect */}
                <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
              
              <motion.p
                className="mt-4 text-xs text-muted-foreground/60 font-inter"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                Click to explore the world of AI
              </motion.p>
            </motion.div>
          </motion.div>
        </main>
      </div>

      {/* Dive Animation */}
      <DiveAnimation isActive={isDiving} clickPosition={clickPosition} />
    </div>
  );
};

export default Discovery;
