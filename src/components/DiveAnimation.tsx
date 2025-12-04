import { motion } from 'framer-motion';

interface DiveAnimationProps {
  isActive: boolean;
  clickPosition: { x: number; y: number };
}

const DiveAnimation = ({ isActive, clickPosition }: DiveAnimationProps) => {
  if (!isActive) return null;

  const particles = Array.from({ length: 60 }, (_, i) => {
    const angle = (i / 60) * Math.PI * 2;
    const velocity = Math.random() * 800 + 400;
    return {
      id: i,
      tx: Math.cos(angle) * velocity,
      ty: Math.sin(angle) * velocity,
      size: Math.random() * 6 + 2,
      delay: Math.random() * 0.3,
    };
  });

  const rings = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    delay: i * 0.1,
    scale: (i + 1) * 3,
  }));

  return (
    <div className="fixed inset-0 z-50 pointer-events-none" style={{ perspective: '1000px' }}>
      {/* Central warp effect */}
      <motion.div
        className="absolute"
        style={{
          left: clickPosition.x,
          top: clickPosition.y,
          transform: 'translate(-50%, -50%)',
        }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeIn" }}
      >
        {/* Expanding rings */}
        {rings.map((ring) => (
          <motion.div
            key={ring.id}
            className="absolute rounded-full border-2 border-primary"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 20,
              height: 20,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ 
              scale: ring.scale * 30,
              opacity: 0,
              borderWidth: 0.5,
            }}
            transition={{
              duration: 1.2,
              delay: ring.delay,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Exploding particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-primary"
            style={{
              width: particle.size,
              height: particle.size,
              left: '50%',
              top: '50%',
              boxShadow: '0 0 10px hsl(var(--primary))',
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: particle.tx,
              y: particle.ty,
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 1.2,
              delay: particle.delay,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.div>

      {/* Tunnel effect / vortex */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-primary/30 rounded-full"
            style={{
              width: '100vmax',
              height: '100vmax',
            }}
            initial={{ scale: 0.1, opacity: 0 }}
            animate={{ 
              scale: [0.1, 2],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 1,
              delay: i * 0.05,
              ease: "easeIn",
            }}
          />
        ))}
      </motion.div>

      {/* Fade to void */}
      <motion.div
        className="absolute inset-0 bg-void"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: "easeIn" }}
      />

      {/* Digital glitch lines */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={`glitch-${i}`}
          className="absolute left-0 right-0 h-px bg-primary/50"
          style={{ top: `${Math.random() * 100}%` }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 0.3,
            delay: 0.3 + Math.random() * 0.5,
          }}
        />
      ))}
    </div>
  );
};

export default DiveAnimation;
