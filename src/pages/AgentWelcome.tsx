import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import  NeuralBackground  from '@/components/NeuralBackground';
import DiveAnimation from '@/components/DiveAnimation';



const AgentWelcome = () => {
  const navigate = useNavigate();
  const [isDiving, setIsDiving] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });



  const handleContinue = (e: React.MouseEvent) => {
    setClickPosition({ x: e.clientX, y: e.clientY });
    setIsDiving(true);
    setTimeout(() => navigate('/chat'), 1500);
  };



  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <NeuralBackground />
      <DiveAnimation isActive={isDiving} clickPosition={clickPosition} />



      <div className="relative z-10 flex flex-col items-center">
        {/* Wrapper to keep big content nicely centered */}
        <div className="max-w-5xl w-full px-6 flex justify-center">
          {/* Robot Container */}
          <motion.div
            className="relative cursor-pointer flex flex-row items-center gap-10 lg:gap-16"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
            onClick={handleContinue}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Speech Bubble on the left - larger */}
            <motion.div
              className="relative w-80 sm:w-96 lg:w-[28rem] order-1"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 150 }}
            >
              <div className="relative bg-card/80 backdrop-blur-md border border-primary/30 rounded-2xl p-5 sm:p-6 lg:p-7 shadow-lg shadow-primary/10">
                <p className="font-orbitron text-base sm:text-lg lg:text-xl text-foreground text-center leading-relaxed">
                  Welcome to the universe of{" "}
                  <span className="text-primary font-bold">Chatbots</span>
                </p>
                <p className="text-xs sm:text-sm lg:text-base text-muted-foreground text-center mt-4">
                  A chatbot is a digital assistant you can talk to in normal language.
It can answer questions, give information, and guide you step-by-step through tasks.
Instead of clicking menus, you just chat with it like a real person.
                </p>


                {/* NEW: Button under the bubble text */}
                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/chat');
                    }}
                    className="font-inter text-xs sm:text-sm px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Enter the chat
                  </button>
                </div>

                {/* Bubble pointer pointing to the right (towards robot) */}
                <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-7 h-7 bg-card/80 border-t border-r border-primary/30 rotate-45" />
              </div>
            </motion.div>


            {/* Robot Body on the right - larger */}
            <motion.div
              className="relative w-52 h-64 sm:w-64 sm:h-80 lg:w-72 lg:h-96 order-2"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl scale-150" />
              
              {/* Head */}
              <motion.div 
                className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 bg-gradient-to-b from-muted to-muted/80 rounded-2xl border-2 border-primary/40 shadow-lg shadow-primary/20"
              >
                {/* Antenna */}
                <motion.div 
                  className="absolute -top-7 left-1/2 -translate-x-1/2 w-1.5 h-7 bg-primary/60"
                  animate={{ scaleY: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <motion.div 
                    className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-primary"
                    animate={{ 
                      boxShadow: [
                        "0 0 10px hsl(var(--primary))",
                        "0 0 25px hsl(var(--primary))",
                        "0 0 10px hsl(var(--primary))"
                      ]
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </motion.div>
                
                {/* Eyes */}
                <div className="absolute top-7 sm:top-9 left-1/2 -translate-x-1/2 flex gap-5 sm:gap-6">
                  <motion.div 
                    className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full bg-primary"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        "0 0 15px hsl(var(--primary))",
                        "0 0 30px hsl(var(--primary))",
                        "0 0 15px hsl(var(--primary))"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div 
                    className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full bg-primary"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        "0 0 15px hsl(var(--primary))",
                        "0 0 30px hsl(var(--primary))",
                        "0 0 15px hsl(var(--primary))"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  />
                </div>
                
                {/* Mouth */}
                <motion.div 
                  className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 w-10 h-2.5 bg-primary/60 rounded-full"
                  animate={{ scaleX: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>

              {/* Body - moved a bit further down */}
              <div className="absolute top-32 sm:top-36 lg:top-40 left-1/2 -translate-x-1/2 w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-gradient-to-b from-muted to-muted/70 rounded-xl border-2 border-primary/30">
                {/* Chest light */}
                <motion.div 
                  className="absolute top-4 left-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center"
                  animate={{ 
                    backgroundColor: ["hsl(var(--primary) / 0.2)", "hsl(var(--primary) / 0.4)", "hsl(var(--primary) / 0.2)"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div 
                    className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary"
                    animate={{ scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </motion.div>
              </div>



              {/* Arms */}
              <motion.div 
                className="absolute top-32 sm:top-36 -left-3 sm:-left-4 w-5 h-16 sm:w-6 sm:h-20 lg:w-7 lg:h-24 bg-muted rounded-full border border-primary/30"
                animate={{ rotate: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div 
                className="absolute top-32 sm:top-36 -right-3 sm:-right-4 w-5 h-16 sm:w-6 sm:h-20 lg:w-7 lg:h-24 bg-muted rounded-full border border-primary/30"
                animate={{ rotate: [5, -5, 5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </div>



        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-16"
        >
          <button
            onClick={() => navigate('/wheelpage')}
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
        </motion.div>
      </div>
    </div>
  );
};



export default AgentWelcome;
