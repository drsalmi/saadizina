import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-2xl">
      <motion.div
        className="w-full sm:w-auto"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={onPrevious}
          disabled={!canGoPrevious}
          size="lg"
          variant="secondary"
          className="w-full sm:w-auto text-xl h-16 px-8 rounded-2xl font-semibold shadow-lg"
        >
          <ChevronLeft className="mr-2 h-6 w-6" />
          Question précédente
        </Button>
      </motion.div>

      <motion.div
        className="w-full sm:w-auto"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={onNext}
          disabled={!canGoNext}
          size="lg"
          className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-xl h-16 px-8 rounded-2xl font-semibold shadow-lg"
        >
          {isLastQuestion ? "Terminer le quiz" : "Question suivante"}
          <ChevronRight className="ml-2 h-6 w-6" />
        </Button>
      </motion.div>
    </div>
  );
};
