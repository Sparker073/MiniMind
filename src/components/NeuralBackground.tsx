import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Node {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

const NeuralBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const nodes: Node[] = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 4,
  }));

  const connections = nodes.slice(0, 15).map((node, i) => {
    const targetIndex = (i + Math.floor(Math.random() * 5) + 1) % nodes.length;
    return {
      id: i,
      x1: node.x,
      y1: node.y,
      x2: nodes[targetIndex].x,
      y2: nodes[targetIndex].y,
      delay: Math.random() * 2,
    };
  });

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Neural connection lines */}
      <svg className="absolute inset-0 w-full h-full">
        {connections.map((conn) => (
          <motion.line
            key={conn.id}
            x1={`${conn.x1}%`}
            y1={`${conn.y1}%`}
            x2={`${conn.x2}%`}
            y2={`${conn.y2}%`}
            stroke="hsl(var(--neural-line))"
            strokeWidth="0.5"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              pathLength: 1,
            }}
            transition={{
              opacity: {
                duration: 3,
                repeat: Infinity,
                delay: conn.delay,
              },
              pathLength: {
                duration: 2,
                delay: conn.delay,
              }
            }}
          />
        ))}
      </svg>

      {/* Floating nodes */}
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className="neural-node"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: node.size,
            height: node.size,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
            x: [0, Math.random() * 20 - 10, 0],
            y: [0, Math.random() * 20 - 10, 0],
          }}
          transition={{
            duration: node.duration,
            repeat: Infinity,
            delay: node.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Ambient particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            y: [0, -100],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default NeuralBackground;
