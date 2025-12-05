import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2 text-sm font-body">
        <span className="text-muted-foreground">Progress</span>
        <span className="text-primary font-display font-bold">{current}/{total}</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))',
          }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      
      {/* Step indicators */}
      <div className="flex justify-between mt-3">
        {Array.from({ length: total }).map((_, index) => (
          <motion.div
            key={index}
            className={`
              w-8 h-8 rounded-full flex items-center justify-center font-display text-xs font-bold
              transition-all duration-300
              ${index < current 
                ? 'bg-primary text-primary-foreground' 
                : index === current 
                  ? 'bg-primary/30 text-primary border-2 border-primary' 
                  : 'bg-muted text-muted-foreground'
              }
            `}
            initial={{ scale: 0.8 }}
            animate={{ 
              scale: index === current ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {index + 1}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;