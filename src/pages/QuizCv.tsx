import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NeuralBackground from '@/components/NeuralBackground';
import QuizCard from '@/components/QuizCard';
import ScoreDisplay from '@/components/ScoreDisplay';
import ProgressBar from '@/components/ProgressBar';

const quizData = [
  {
    id: 1,
    question: 'What does a webcam provide to a computer vision program?',
    options: [
      { label: 'A', text: 'Text' },
      { label: 'B', text: 'Images (frames)' },
      { label: 'C', text: 'Sound' },
      { label: 'D', text: 'Programs' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 2,
    question: 'When you show your hand to the camera, the program is analyzing...',
    options: [
      { label: 'A', text: 'The color of your clothes' },
      { label: 'B', text: 'The shape and position of your fingers' },
      { label: 'C', text: 'Your phone' },
      { label: 'D', text: 'Your background' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 3,
    question: 'What is the main goal of Computer Vision?',
    options: [
      { label: 'A', text: 'Teach computers to talk' },
      { label: 'B', text: 'Teach computers to understand images and video' },
      { label: 'C', text: 'Teach computers to write code' },
      { label: 'D', text: 'Teach computers to store files' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 4,
    question:
      'In the "show 1-2-3" game, how did the computer recognize the number?',
    options: [
      { label: 'A', text: 'It guessed randomly' },
      { label: 'B', text: 'It counted the number of fingers you raised' },
      { label: 'C', text: 'It asked Google' },
      { label: 'D', text: 'It used GPS' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 5,
    question: 'What is a frame?',
    options: [
      { label: 'A', text: 'A single image from the webcam' },
      { label: 'B', text: 'A video file' },
      { label: 'C', text: 'A window' },
      { label: 'D', text: 'A dataset' },
    ],
    correctAnswer: 'A',
  },
];

const Index = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [questionSubmitted, setQuestionSubmitted] = useState(false);

  const currentQuiz = quizData[currentQuestion];

  const handleSelect = (answer: string) => {
    if (!questionSubmitted) {
      setAnswers((prev) => ({ ...prev, [currentQuiz.id]: answer }));
    }
  };

  const handleNext = () => {
    if (!questionSubmitted) {
      setQuestionSubmitted(true);
    } else {
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setQuestionSubmitted(false);
      } else {
        setShowResult(true);
      }
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setQuestionSubmitted(false);
  };

  const calculateScore = () => {
    return quizData.reduce((score, q) => {
      return answers[q.id] === q.correctAnswer ? score + 1 : score;
    }, 0);
  };

  const hasAnswered = answers[currentQuiz?.id] !== undefined;
  const isLastQuestion = currentQuestion === quizData.length - 1;

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <NeuralBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <motion.header
          className="text-center px-4 pt-8 pb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-4 px-6 py-2 rounded-full border border-primary/30 bg-card/50 backdrop-blur-md"
            animate={{
              boxShadow: [
                '0 0 20px hsl(var(--primary) / 0.2)',
                '0 0 40px hsl(var(--primary) / 0.4)',
                '0 0 20px hsl(var(--primary) / 0.2)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="font-display text-sm tracking-widest text-primary font-bold">
              Deepen your CV knowledge
            </span>
          </motion.div>

          <h1 className="font-display text-3xl md:text-5xl font-black mb-2 glow-text">
            Computer Vision Quiz
          </h1>

          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto font-body">
            Improve your skills about Computer Vision
          </p>
        </motion.header>

        {/* Main centered quiz area */}
        <main className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-2xl mx-auto">
            {!showResult ? (
              <div className="flex flex-col items-center">
                <motion.div
                  className="mb-6 w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <ProgressBar
                    current={currentQuestion + (questionSubmitted ? 1 : 0)}
                    total={quizData.length}
                  />
                </motion.div>

                <AnimatePresence mode="wait">
                  <QuizCard
                    key={currentQuiz.id}
                    questionNumber={currentQuestion + 1}
                    totalQuestions={quizData.length}
                    question={currentQuiz.question}
                    options={currentQuiz.options}
                    selectedAnswer={answers[currentQuiz.id] || null}
                    correctAnswer={currentQuiz.correctAnswer}
                    isSubmitted={questionSubmitted}
                    onSelect={handleSelect}
                  />
                </AnimatePresence>

                <motion.div
                  className="mt-6 text-center w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.button
                    className="neon-button"
                    onClick={handleNext}
                    disabled={!hasAnswered}
                    whileHover={hasAnswered ? { scale: 1.05 } : {}}
                    whileTap={hasAnswered ? { scale: 0.95 } : {}}
                    style={{ opacity: hasAnswered ? 1 : 0.5 }}
                  >
                    {!questionSubmitted
                      ? 'Check Answer'
                      : isLastQuestion
                      ? 'See Results'
                      : 'Next Question'}
                  </motion.button>
                </motion.div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <ScoreDisplay
                  score={calculateScore()}
                  total={quizData.length}
                  isVisible={showResult}
                />

                <motion.div
                  className="mt-6 text-center w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.button
                    className="neon-button"
                    onClick={handleReset}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    
                  >
                    Try Again
                  </motion.button>
                </motion.div>
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <motion.footer
          className="text-center py-4 text-muted-foreground text-sm font-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p>Made for future AI engineers</p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;