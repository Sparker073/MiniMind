import  NeuralBackground  from "@/components/NeuralBackground";
import HandGame from "@/components/HandGame";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const GestureGame = () => {
  const navigate = useNavigate();
  const [showExplanation, setShowExplanation] = useState(false);
  const [showGame, setShowGame] = useState(true);

  const handleExit = () => {
    // Unmount HandGame before navigation
    setShowGame(false);
    // Small timeout to let cleanup run (especially helpful in StrictMode dev).
    setTimeout(() => navigate("/wheelpage"), 0);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Exit button (top-left) */}
      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={handleExit}
          className="font-inter text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
        >
          <motion.span
            animate={{ x: [-3, 0, -3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ←
          </motion.span>
          Back to Wheel
        </button>
      </div>

      {/* Go blank button (top-right) */}
      <button
        onClick={() => navigate("/quizes")}
        className="absolute top-4 right-4 z-20 px-4 py-2 text-sm font-medium rounded-lg 
                   bg-primary text-primary-foreground 
                   border border-primary/60 
                   hover:bg-primary/90 hover:border-primary 
                   transition-all duration-300"
      >
        Go Deeper
      </button>

      {/* Background behind content */}
      <NeuralBackground />

      {/* Main content on top */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-6 px-4">
        {showGame && (
          <HandGame onGameComplete={() => setShowExplanation(true)} />
        )}

        {showExplanation && (
          <motion.div
            className="max-w-xl mt-6 px-4 py rounded-lg bg-background/80 border border-primary/40 text-sm sm:text-base font-inter text-foreground text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="mb-2 font-semibold">
              Well done! The camera detected the numbers you showed.
            </p>
            <p className="mb-1">
              This happened because the program analyzed the shapes of your fingers using Computer Vision.
            </p>
            <p>
              Now let’s dive into the basics of how this detection works.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GestureGame;
