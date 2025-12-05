import { useState, useCallback } from 'react';
import { MessageSquare, Eye, Layers, Monitor, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';


interface WheelItem {
  id: string;
  label: string;
  labelFr: string;
  icon: React.ElementType;
  description: string;
}


const wheelItems: WheelItem[] = [
  {
    id: 'chatbot',
    label: 'Chatbot',
    labelFr: 'Chatbot AI',
    icon: MessageSquare,
    description:
      "Discover how AI can chat with you and answer your questions like a human. Chatbots use natural language processing to understand and generate text.",
  },
  {
    id: 'image-recognition',
    label: 'Image Recognition',
    labelFr: 'Image Recognition',
    icon: Eye,
    description:
      "Learn how AI can identify and analyze what is inside an image. It can recognize objects, faces, and even emotions in photos.",
  },
  {
    id: 'classification',
    label: 'Simple Classification',
    labelFr: 'Simple Classification',
    icon: Layers,
    description:
      "Understand how AI sorts and organizes data into categories. This is the basis for many applications like email filtering or spam detection.",
  },
  {
    id: 'computer-vision',
    label: 'Computer Vision',
    labelFr: 'Computer Vision',
    icon: Monitor,
    description:
      "Explore how machines see and interpret the visual world. It is used in self-driving cars, medicine, and augmented reality.",
  },
];


export const AIWheel = () => {
  const [selectedItem, setSelectedItem] = useState<WheelItem | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const navigate = useNavigate();

  const spinWheel = useCallback(() => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedItem(null);

    // Random number of full rotations (3-5) plus random position
    const fullRotations = 3 + Math.floor(Math.random() * 3);
    const randomIndex = Math.floor(Math.random() * 4);
    const targetAngle = fullRotations * 360 + randomIndex * 90 + 45; // This adds a little random offset

    // Adjust the target angle to make sure the selected item always lands on top
    const normalizedTargetAngle =
      targetAngle + (360 - (targetAngle % 360)); // Ensure the final angle is always a multiple of 360

    const spinDuration = 3 + Math.random(); // Randomized spin duration

    setRotation((prev) => prev + normalizedTargetAngle);

    setTimeout(() => {
      setSelectedItem(wheelItems[randomIndex]);
      setIsSpinning(false);
    }, spinDuration * 1000); // Timeout adjusted for randomized duration
  }, [isSpinning]);

  return (
    <div className="relative flex flex-col items-center gap-8 lg:gap-12">
      {/* Wheel Container */}
      <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px]">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse-glow" />
        <div className="absolute inset-4 rounded-full border border-primary/20" />

        {/* Rotating Wheel */}
        <div
          className="absolute inset-0 transition-transform ease-out"
          style={{
            transform: `rotate(${rotation}deg)`,
            transitionDuration: isSpinning ? '4s' : '0s',
            transitionTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)', // Smooth easing
          }}
        >
          {/* Wheel Items */}
          {wheelItems.map((item, index) => {
            const angle = (index * 90 - 45) * (Math.PI / 180);
            const x = 50 + Math.cos(angle) * 35;
            const y = 50 + Math.sin(angle) * 35;

            return (
              <div
                key={item.id}
                className={cn(
                  'absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group',
                  'w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28',
                  !isSpinning && hoveredIndex === index && 'scale-110 z-10',
                  !isSpinning && selectedItem?.id === item.id && 'scale-110',
                )}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                }}
                onMouseEnter={() => !isSpinning && setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className={cn(
                    'w-full h-full rounded-full card-glass flex flex-col items-center justify-center gap-1 sm:gap-2 transition-all duration-300',
                    !isSpinning && selectedItem?.id === item.id && 'border-glow bg-primary/10',
                  )}
                >
                  <item.icon
                    className={cn(
                      'w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-primary transition-all duration-300',
                      !isSpinning && selectedItem?.id === item.id && 'text-glow scale-110',
                    )}
                  />
                  <span
                    className="text-[10px] sm:text-xs lg:text-sm font-medium text-foreground/90 text-center px-1 leading-tight"
                    style={{ transform: `rotate(-${rotation}deg)` }}
                  >
                    {item.labelFr.split(' ')[0]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-10">
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className={cn(
              'w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-primary/20 to-transparent border border-primary/40 flex items-center justify-center box-glow transition-all duration-300',
              'hover:from-primary/30 hover:border-primary/60 hover:scale-105',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
              isSpinning && 'animate-pulse',
            )}
          >
            <div className="flex flex-col items-center gap-1">
              <Play
                className={cn(
                  'w-5 h-5 sm:w-6 sm:h-6 text-primary',
                  isSpinning && 'animate-spin',
                )}
              />
              <span className="text-[10px] sm:text-xs font-display text-primary text-glow text-center">
                {isSpinning ? 'Spinning...' : 'SPIN'}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Selected Item Info */}
      <div
        className={cn(
          'w-full max-w-md min-h-[160px] transition-all duration-500',
          selectedItem && !isSpinning
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none',
        )}
      >
        {selectedItem && !isSpinning && (
          <div className="card-glass rounded-xl p-4 sm:p-6 border-glow animate-scale-in">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/30">
                <selectedItem.icon className="w-6 h-6 text-primary text-glow" />
              </div>
              <h3 className="font-display text-lg sm:text-xl text-foreground">
                {selectedItem.labelFr}
              </h3>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              {selectedItem.description}
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  if (selectedItem?.id === 'chatbot') {
                    navigate('/agent');
                  } else {
                    if (selectedItem?.id === 'computer-vision'){
                      navigate('/gesture-game');
                    }
                    else{
                      navigate('/blank');
                    }
                    
                  }
                }}
                className="px-4 py-2 text-sm font-medium rounded-lg 
                            bg-primary text-primary-foreground 
                            border border-primary/60 
                            hover:bg-primary/90 hover:border-primary 
                            transition-all duration-300"
              >
                Dive into this field
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Spinning hint */}
      {!selectedItem && !isSpinning && (
        <p className="text-xs sm:text-sm text-muted-foreground animate-pulse-glow text-center">
          Press SPIN to discover an AI field to explore.
        </p>
      )}
    </div>
  );
};
