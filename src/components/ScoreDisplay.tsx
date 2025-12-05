import { motion } from 'framer-motion';

interface ScoreDisplayProps {
  score: number;
  total: number;
  isVisible: boolean;
}

const ScoreDisplay = ({ score, total, isVisible }: ScoreDisplayProps) => {
  const percentage = Math.round((score / total) * 100);
  
  const getMessage = () => {
    if (percentage === 100) return "Perfect! You're an AI Master!";
    if (percentage >= 80) return "Amazing! Almost perfect!";
    if (percentage >= 60) return "Good job! Keep learning!";
    if (percentage >= 40) return "Not bad! Try again?";
    return "Keep practicing! You got this!";
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="quiz-card p-8 text-center"
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-6 glow-text">
        Quiz Complete!
      </h2>
      
      <div className="relative inline-block mb-6">
        <motion.div
          className="text-6xl md:text-8xl font-display font-black"
          style={{ 
            background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {score}/{total}
        </motion.div>
        
        <motion.div
          className="absolute -inset-4 rounded-2xl opacity-30"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      
      <motion.p
        className="text-lg md:text-xl font-body text-muted-foreground mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {getMessage()}
      </motion.p>

      <motion.div
        className="h-3 bg-muted rounded-full overflow-hidden max-w-xs mx-auto"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))',
          }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
        />
      </motion.div>
      <p className="mt-2 text-sm text-muted-foreground font-display">{percentage}%</p>
    </motion.div>
  );
};

export default ScoreDisplay;