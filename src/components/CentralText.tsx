import { motion } from 'framer-motion';

const CentralText = () => {
  const sentence = "Behind every click, a silent intelligence awakens — discover how it thinks";
  const words = sentence.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.5,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: 'blur(10px)',
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-8 md:px-16">
      {/* Decorative elements */}
      <motion.div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      />
      
      {/* Main text */}
      <motion.h1
        className="font-orbitron text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center leading-relaxed md:leading-loose max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            className={`inline-block mr-2 sm:mr-3 ${
              ['intelligence', 'awakens', 'thinks'].includes(word.replace(/[—,]/g, ''))
                ? 'text-gradient-neural glow-text'
                : 'text-foreground/90'
            }`}
            variants={wordVariants}
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>

      {/* Subtitle hint */}
      <motion.p
        className="mt-8 sm:mt-12 text-muted-foreground text-sm sm:text-base md:text-lg font-inter tracking-wide"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.8 }}
      >
        <motion.span
          className="inline-block"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Click anywhere to begin your journey
        </motion.span>
      </motion.p>

      {/* Animated cursor hint */}
      <motion.div
        className="mt-6 sm:mt-8 flex items-center gap-2 text-primary/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <motion.div
          className="w-6 h-10 sm:w-8 sm:h-12 border-2 border-primary/40 rounded-full flex justify-center pt-2"
          animate={{ borderColor: ['hsl(var(--primary) / 0.4)', 'hsl(var(--primary) / 0.8)', 'hsl(var(--primary) / 0.4)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-3 sm:w-2 sm:h-4 bg-primary rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* Decorative bottom element */}
      <motion.div
        className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-secondary to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      />
    </div>
  );
};

export default CentralText;
