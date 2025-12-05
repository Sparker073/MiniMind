import { motion } from 'framer-motion';

interface Option {
  label: string;
  text: string;
}

interface QuizCardProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  options: Option[];
  selectedAnswer: string | null;
  correctAnswer: string;
  isSubmitted: boolean;
  onSelect: (answer: string) => void;
}

const QuizCard = ({
  questionNumber,
  totalQuestions,
  question,
  options,
  selectedAnswer,
  correctAnswer,
  isSubmitted,
  onSelect,
}: QuizCardProps) => {
  const getOptionClass = (label: string) => {
    const baseClasses = 'w-full text-left p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer';

    if (isSubmitted) {
      if (label === correctAnswer) {
        return `${baseClasses} border-green-500 bg-green-500/20`;
      }
      if (label === selectedAnswer && label !== correctAnswer) {
        return `${baseClasses} border-red-500 bg-red-500/20`;
      }
      return `${baseClasses} border-gray-600 bg-gray-800/50 opacity-50`;
    } else if (selectedAnswer === label) {
      return `${baseClasses} border-primary bg-primary/20`;
    }

    return `${baseClasses} border-gray-600 bg-gray-800/50 hover:border-primary/50 hover:bg-gray-700/50`;
  };

  return (
    <motion.div
      className="w-full rounded-2xl bg-card/70 border border-border/60 shadow-xl p-6 md:p-8 backdrop-blur-md"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
      key={questionNumber}
    >
      <div className="flex items-center justify-between mb-6">
        <span className="font-display text-primary text-lg font-bold tracking-wider">
          Question {questionNumber}
        </span>
        <span className="text-muted-foreground text-sm font-body">
          {questionNumber} of {totalQuestions}
        </span>
      </div>

      <h3 className="text-xl md:text-2xl font-body font-semibold mb-8 leading-relaxed">
        {question}
      </h3>

      <div className="space-y-3">
        {options.map((option, index) => (
          <motion.button
            key={option.label}
            className={getOptionClass(option.label)}
            onClick={() => !isSubmitted && onSelect(option.label)}
            disabled={isSubmitted}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={!isSubmitted ? { scale: 1.02 } : {}}
            whileTap={!isSubmitted ? { scale: 0.98 } : {}}
          >
            <span className="flex items-center gap-4">
              <span
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-display text-sm font-bold shrink-0
                  ${
                    isSubmitted && option.label === correctAnswer
                      ? 'bg-green-500 text-white'
                      : isSubmitted &&
                        option.label === selectedAnswer &&
                        option.label !== correctAnswer
                      ? 'bg-red-500 text-white'
                      : selectedAnswer === option.label
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-gray-600 text-white'
                  }
                  transition-colors duration-300
                `}
              >
                {option.label}
              </span>
              <span className="text-foreground font-medium text-lg flex-1 text-left">
                {option.text}
              </span>
              {isSubmitted && option.label === correctAnswer && (
                <span className="text-green-500 text-xl font-bold">✓</span>
              )}
              {isSubmitted && option.label === selectedAnswer && option.label !== correctAnswer && (
                <span className="text-red-500 text-xl font-bold">✗</span>
              )}
            </span>
          </motion.button>
        ))}
      </div>

      {isSubmitted && (
        <motion.div
          className="mt-6 p-4 bg-card/50 border border-border/40 rounded-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm font-body">
            {selectedAnswer === correctAnswer ? (
              <span className="text-green-400 font-semibold">
                Correct! Great job!
              </span>
            ) : (
              <span className="text-red-400 font-semibold">
                Not quite. The correct answer is {correctAnswer}.
              </span>
            )}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default QuizCard;