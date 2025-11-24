import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedButton from "./AnimatedButton";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  isLastQuestion: boolean;
}

export const NavigationButtons = ({
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
  isLastQuestion,
}: NavigationButtonsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-12 justify-center items-center w-full max-w-2xl">
      <motion.div
        className="w-full sm:w-auto sm:flex-1"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {canGoPrevious && (
          <AnimatedButton
            text="Question précédente"
            actionText="Question précédente"
            icon={<FaChevronLeft className="size-10" />}
            theme="blue"
            orientation="horizontal"
            onClick={() => onPrevious()}
            className="w-full"
          />
        )}
      </motion.div>

      <motion.div
        className="w-full sm:w-auto  sm:flex-1"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {canGoNext && (
          <AnimatedButton
            text={isLastQuestion ? "Terminer le quiz" : "Question suivante"}
            actionText={isLastQuestion ? "Terminer le quiz" : "Question suivante"}
            icon={<FaChevronRight className="size-10" />}
            theme="emerald"
            orientation="horizontal"
            onClick={() => onNext()}
            className="w-full"
          />
        )}

      </motion.div>
    </div>
  );
};
