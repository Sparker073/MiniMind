import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";
import { Hand, Brain, CheckCircle2 } from "lucide-react";
import { NetworkBackground } from "@/components/NetworkBackground";

type HandGameProps = {
  onGameComplete?: () => void;
};

const HandGame = ({ onGameComplete }: HandGameProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [model, setModel] = useState<handpose.HandPose | null>(null);
  const [gestureEstimator, setGestureEstimator] =
    useState<fp.GestureEstimator | null>(null);

  const [expectedStep, setExpectedStep] = useState<1 | 2 | 3>(1);
  const [message, setMessage] = useState<string>("Show 1 finger to begin");
  const [debug, setDebug] = useState<string>("Initializing neural network...");
  const [isLoading, setIsLoading] = useState(true);
  const [gameWon, setGameWon] = useState(false);

  const [gestureConfidence, setGestureConfidence] = useState<number>(0);
  const [lastDetectedGesture, setLastDetectedGesture] = useState<string | null>(
    null
  );
  const [confirmationFrames, setConfirmationFrames] = useState<number>(0);
  const REQUIRED_FRAMES = 8;

  // NEW: central helper, used everywhere we want to stop the cam
  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
  };

  // Setup gestures
  useEffect(() => {
    const one = new fp.GestureDescription("ONE");
    const two = new fp.GestureDescription("TWO");
    const three = new fp.GestureDescription("THREE");

    const allFingers = [
      fp.Finger.Thumb,
      fp.Finger.Index,
      fp.Finger.Middle,
      fp.Finger.Ring,
      fp.Finger.Pinky,
    ];

    allFingers.forEach((finger) => {
      if (finger === fp.Finger.Index) {
        one.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
        one.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
        one.addDirection(finger, fp.FingerDirection.DiagonalUpLeft, 0.8);
        one.addDirection(finger, fp.FingerDirection.DiagonalUpRight, 0.8);
      } else if (finger === fp.Finger.Thumb) {
        one.addCurl(finger, fp.FingerCurl.NoCurl, 0.5);
        one.addCurl(finger, fp.FingerCurl.HalfCurl, 0.5);
        one.addCurl(finger, fp.FingerCurl.FullCurl, 0.5);
      } else {
        one.addCurl(finger, fp.FingerCurl.FullCurl, 0.8);
        one.addCurl(finger, fp.FingerCurl.HalfCurl, 0.8);
      }
    });

    allFingers.forEach((finger) => {
      if (finger === fp.Finger.Index || finger === fp.Finger.Middle) {
        two.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
        two.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
        two.addDirection(finger, fp.FingerDirection.DiagonalUpLeft, 0.8);
        two.addDirection(finger, fp.FingerDirection.DiagonalUpRight, 0.8);
      } else if (finger === fp.Finger.Thumb) {
        two.addCurl(finger, fp.FingerCurl.NoCurl, 0.5);
        two.addCurl(finger, fp.FingerCurl.HalfCurl, 0.5);
        two.addCurl(finger, fp.FingerCurl.FullCurl, 0.5);
      } else {
        two.addCurl(finger, fp.FingerCurl.FullCurl, 0.8);
        two.addCurl(finger, fp.FingerCurl.HalfCurl, 0.8);
      }
    });

    allFingers.forEach((finger) => {
      if (
        finger === fp.Finger.Index ||
        finger === fp.Finger.Middle ||
        finger === fp.Finger.Ring
      ) {
        three.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
        three.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
        three.addDirection(finger, fp.FingerDirection.DiagonalUpLeft, 0.8);
        three.addDirection(finger, fp.FingerDirection.DiagonalUpRight, 0.8);
      } else if (finger === fp.Finger.Thumb) {
        three.addCurl(finger, fp.FingerCurl.NoCurl, 0.5);
        three.addCurl(finger, fp.FingerCurl.HalfCurl, 0.5);
        three.addCurl(finger, fp.FingerCurl.FullCurl, 0.5);
      } else {
        three.addCurl(finger, fp.FingerCurl.FullCurl, 0.8);
        three.addCurl(finger, fp.FingerCurl.HalfCurl, 0.8);
      }
    });

    const estimator = new fp.GestureEstimator([one, two, three]);
    setGestureEstimator(estimator);
  }, []);

  // Camera + model setup
  useEffect(() => {
    let animationId: number; // kept from your original code, in case you reuse it

    const setupCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    };

    const loadModel = async () => {
      setDebug("Loading TensorFlow.js...");
      await tf.ready();
      setDebug("Accessing camera...");
      await setupCamera();
      setDebug("Loading hand detection model...");
      const m = await handpose.load();
      setModel(m);
      setIsLoading(false);
      setDebug("Neural network ready! Show your hand.");
    };

    loadModel();

    return () => {
      cancelAnimationFrame(animationId);
      stopCamera();
    };
  }, []);

  // Stop camera when game is won
  useEffect(() => {
    if (gameWon && videoRef.current?.srcObject) {
      stopCamera();
    }
  }, [gameWon]);

  const handleGesture = (
    name: "ONE" | "TWO" | "THREE" | null,
    score: number
  ) => {
    if (!name || gameWon) {
      if (!gameWon) {
        setConfirmationFrames(0);
        setLastDetectedGesture(null);
      }
      return;
    }

    const detected = name === "ONE" ? 1 : name === "TWO" ? 2 : (3 as 1 | 2 | 3);

    if (lastDetectedGesture === name) {
      const newFrames = confirmationFrames + 1;
      setConfirmationFrames(newFrames);
      setGestureConfidence(Math.min(newFrames / REQUIRED_FRAMES, 1) * 100);

      if (newFrames >= REQUIRED_FRAMES && detected === expectedStep) {
        if (expectedStep === 3) {
          setMessage("Good Job! 🎉");
          setGameWon(true);
          setGestureConfidence(100);

          // notify parent that the task is done
          if (onGameComplete) {
            onGameComplete();
          }
        } else {
          const nextStep = (expectedStep + 1) as 1 | 2 | 3;
          setExpectedStep(nextStep);
          setMessage(
            `Excellent! Now show ${nextStep} finger${
              nextStep > 1 ? "s" : ""
            }`
          );
          setConfirmationFrames(0);
          setLastDetectedGesture(null);
          setGestureConfidence(0);
        }
      }
    } else {
      setLastDetectedGesture(name);
      setConfirmationFrames(1);
      setGestureConfidence((1 / REQUIRED_FRAMES) * 100);

      if (detected !== expectedStep) {
        setMessage(`Detected ${detected}, need ${expectedStep}. Keep trying!`);
      }
    }
  };

  // Detection loop
  useEffect(() => {
    if (!model || !gestureEstimator || !videoRef.current) return;

    let animationId: number;

    const detect = async () => {
      if (!videoRef.current || videoRef.current.readyState !== 4) {
        animationId = requestAnimationFrame(detect);
        return;
      }

      const predictions = await model.estimateHands(videoRef.current);

      if (predictions.length > 0) {
        setDebug("Hand detected!");
        const landmarks = predictions[0].landmarks as fp.Landpoint[];

        const estimated = await gestureEstimator.estimate(landmarks, 4);
        if (estimated.gestures && estimated.gestures.length > 0) {
          const best = estimated.gestures.reduce((p, c) =>
            c.score > p.score ? c : p
          );

          if (best.score > 0.5) {
            const name = best.name as "ONE" | "TWO" | "THREE";
            setDebug(
              `Gesture: ${name} | Confidence: ${(best.score * 100).toFixed(
                0
              )}%`
            );
            handleGesture(name, best.score);
          } else {
            setDebug("Gesture unclear - spread fingers more");
          }
        } else {
          setDebug("No gesture matched - try different pose");
          handleGesture(null, 0);
        }
      } else {
        setDebug("Waiting for hand...");
        handleGesture(null, 0);
      }

      animationId = requestAnimationFrame(detect);
    };

    detect();

    return () => cancelAnimationFrame(animationId);
  }, [model, gestureEstimator, expectedStep, confirmationFrames, lastDetectedGesture, gameWon]);

  const resetGame = () => {
    setExpectedStep(1);
    setMessage("Show 1 finger to begin");
    setGameWon(false);
    setConfirmationFrames(0);
    setLastDetectedGesture(null);
    setGestureConfidence(0);

    // use the same stop helper, then your original restart logic
    stopCamera();

    const restartCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (error) {
        console.error("Error restarting camera:", error);
      }
    };

    restartCamera();
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
    <motion.div className="w-full max-w-lg">
      {/* everything inside here exactly as in your original design:
          title, video, overlays, bars, message, steps, debug… */}
    
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <NetworkBackground />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-6 w-full px-4">
        <motion.div className="w-full max-w-lg">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="font-orbitron text-2xl sm:text-3xl text-gradient-neural mb-2">
              Gesture Recognition
            </h1>
            <p className="font-inter text-sm text-muted-foreground">
              Train the AI to recognize 1 → 2 → 3
            </p>
          </motion.div>

          {/* Video Feed */}
          <motion.div
            className="video-container w-full aspect-[4/3] bg-card relative rounded-lg overflow-hidden mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              style={{ transform: "scaleX(-1)" }}
            />

            {/* Loading Overlay */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-background/90 flex flex-col items-center justify-center gap-4"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Brain className="w-12 h-12 text-primary" />
                  </motion.div>
                  <p className="font-inter text-sm text-muted-foreground">
                    {debug}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step Badge */}
            <motion.div
              className="absolute top-4 left-4 glass-card px-4 py-2 flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Hand className="w-4 h-4 text-primary" />
              <span className="font-orbitron text-sm text-foreground">
                Step {expectedStep}/3
              </span>
            </motion.div>

            {/* Win Overlay */}
            <AnimatePresence>
              {gameWon && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <CheckCircle2 className="w-16 h-16 text-primary" />
                  </motion.div>
                  <h2 className="font-orbitron text-2xl text-gradient-primary">
                    Sequence Complete!
                  </h2>
                  <p className="font-inter text-muted-foreground text-center max-w-xs">
                    The AI successfully recognized your hand gestures in
                    sequence.
                  </p>
                  <motion.button
                    onClick={resetGame}
                    className="mt-4 px-6 py-3 rounded-full bg-primary/20 border border-primary/50 font-inter text-sm text-foreground hover:bg-primary/30 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Play Again
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Confidence Bar */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="confidence-bar">
                <motion.div
                  className="confidence-fill"
                  style={{ width: `${gestureConfidence}%` }}
                  animate={{ width: `${gestureConfidence}%` }}
                />
              </div>
              <p className="mt-2 font-inter text-xs text-center text-muted-foreground">
                Recognition: {gestureConfidence.toFixed(0)}%
              </p>
            </div>
          </motion.div>

          {/* Message */}
          <motion.div
            className="glass-card px-6 py-4 w-full text-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="font-inter text-lg text-foreground">{message}</p>
          </motion.div>

          {/* Step Indicators */}
          <motion.div
            className="flex gap-4 justify-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {[1, 2, 3].map((step) => {
              const isActive = step === expectedStep && !gameWon;
              const isCompleted = step < expectedStep || gameWon;

              return (
                <motion.div
                  key={step}
                  className={`step-indicator flex items-center justify-center w-10 h-10 rounded-full font-orbitron text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-primary/30 border-2 border-primary text-primary"
                      : isCompleted
                      ? "bg-primary/20 border-2 border-primary text-primary"
                      : "bg-secondary border-2 border-secondary text-muted-foreground"
                  }`}
                  animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <span>{step}</span>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Debug Info */}
          <motion.p
            className="font-inter text-xs text-muted-foreground/60 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {debug}
          </motion.p>
        </motion.div>
      </div>
    </div>
  </motion.div>
  </div>
  );
};

export default HandGame;
