import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimerProps {
  timeLeft: number;
  totalTime: number;
  progress: number;
}

export const Timer = ({ timeLeft, totalTime, progress }: TimerProps) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getTimerColor = () => {
    if (timeLeft <= 0) return "hsl(var(--danger))";
    if (timeLeft <= 3) return "hsl(var(--danger))";
    if (timeLeft <= 5) return "hsl(var(--warning))";
    return "hsl(var(--success))";
  };

  return (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <svg width="160" height="160" className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="12"
        />
        {/* Progress circle */}
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke={getTimerColor()}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          animate={{
            strokeDashoffset,
            stroke: getTimerColor(),
          }}
          transition={{ duration: 0.3 }}
        />
      </svg>
      <motion.div
        className={cn(
          "absolute text-5xl font-bold",
          timeLeft <= 3 && timeLeft > 0 && "animate-pulse"
        )}
        style={{ color: getTimerColor() }}
        animate={timeLeft === 0 ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.5 }}
      >
        {timeLeft}
      </motion.div>
    </motion.div>
  );
};
