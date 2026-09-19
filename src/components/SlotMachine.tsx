import { useState, useEffect } from "react";

interface SlotMachineProps {
  finalValue: number;
  duration?: number;
  className?: string;
}

export const SlotMachine = ({ finalValue, duration = 2500, className = "" }: SlotMachineProps) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [isSpinning, setIsSpinning] = useState(true);
  const [animationPhase, setAnimationPhase] = useState<'fast' | 'slow' | 'final' | 'complete'>('fast');

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    let timeout1: ReturnType<typeof setTimeout>;
    let timeout2: ReturnType<typeof setTimeout>;
    let timeout3: ReturnType<typeof setTimeout>;

    // Fast spinning phase - rapid random numbers
    const fastSpin = () => {
      interval = setInterval(() => {
        const maxValue = finalValue > 10 ? 30 : 10; // Handle both individual scores (1-10) and overall (1-30)
        setCurrentValue(Math.floor(Math.random() * maxValue) + 1);
      }, 50);
    };

    // Start fast spinning
    fastSpin();
    setAnimationPhase('fast');

    // After 1 second, slow down
    timeout1 = setTimeout(() => {
      clearInterval(interval);
      setAnimationPhase('slow');
      
      // Slower spinning with numbers closer to final value
      interval = setInterval(() => {
        const variance = Math.random() > 0.7 ? (Math.random() - 0.5) * 4 : 0;
        const maxValue = finalValue > 10 ? 30 : 10;
        const newValue = Math.max(1, Math.min(maxValue, Math.round(finalValue + variance)));
        setCurrentValue(newValue);
      }, 150);
    }, 1000);

    // After 2 seconds, final approach
    timeout2 = setTimeout(() => {
      clearInterval(interval);
      setAnimationPhase('final');
      
      // Very slow spinning with numbers very close to final
      interval = setInterval(() => {
        const variance = Math.random() > 0.8 ? (Math.random() - 0.5) * 2 : 0;
        const maxValue = finalValue > 10 ? 30 : 10;
        const newValue = Math.max(1, Math.min(maxValue, Math.round(finalValue + variance)));
        setCurrentValue(newValue);
      }, 300);
    }, 2000);

    // Final reveal
    timeout3 = setTimeout(() => {
      clearInterval(interval);
      setCurrentValue(finalValue);
      setIsSpinning(false);
      setAnimationPhase('complete');
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, [finalValue, duration]);

  const getAnimationClass = () => {
    if (!isSpinning) return 'animate-glow-text';
    
    switch (animationPhase) {
      case 'fast':
        return 'animate-pulse scale-110';
      case 'slow':
        return 'animate-bounce scale-105';
      case 'final':
        return 'animate-pulse scale-102';
      default:
        return 'animate-glow-text';
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="relative h-full flex items-center justify-center">
        <div 
          className={`text-3xl font-bold transition-all duration-300 ${getAnimationClass()}`}
          style={{
            filter: isSpinning ? 'blur(1px)' : 'none',
            textShadow: isSpinning ? '0 0 10px currentColor' : 'none'
          }}
        >
          {currentValue}
        </div>
        
        {/* Spinning effect overlay */}
        {isSpinning && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent animate-pulse" />
        )}
        
        {/* Slot machine reel effect */}
        {isSpinning && animationPhase === 'fast' && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-60" />
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-full bg-primary/20" />
            <div className="absolute top-0 right-1/4 transform -translate-x-1/2 w-px h-full bg-primary/10" />
            <div className="absolute top-0 left-1/4 transform -translate-x-1/2 w-px h-full bg-primary/10" />
          </div>
        )}
      </div>
      
      {/* Celebration effect when complete */}
      {!isSpinning && (
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-success/20 rounded-lg blur-sm animate-pulse" />
      )}
    </div>
  );
};