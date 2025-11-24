import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Timer } from "@/components/Timer";
import { QuestionCard } from "@/components/QuestionCard";
import { NavigationButtons } from "@/components/NavigationButtons";
import { questions } from "@/data/questions";
import { useTimer } from "@/hooks/useTimer";
import { useSound } from "@/hooks/useSound";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { RotateCcw } from "lucide-react";
import AnimatedButton from "@/components/AnimatedButton";
import { FaRegCircleCheck } from "react-icons/fa6";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { SiRevealdotjs } from "react-icons/si";
import { LuRefreshCcw } from "react-icons/lu";

const TIMER_DURATION = 10;

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<"vrai" | "faux" | null>(null);

  // Sound effects - using data URLs for demo (in production, use actual audio files)
  const tickSound = useSound("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiP1vLPfC4GJXfH8N2RQA==");
  const correctSound = useSound("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiP1vLPfC4GJXfH8N2RQA==");
  const wrongSound = useSound("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiP1vLPfC4GJXfH8N2RQA==");

  const currentQuestion = questions[currentQuestionIndex];

  const { timeLeft, isRunning, start, pause, reset, progress } = useTimer(
    TIMER_DURATION,
    () => {
      if (!showAnswer) {
        tickSound.play();
      }
    },
    () => {
      // Timer completed
    }
  );

  useEffect(() => {
    // Start timer when component mounts or question changes
    if (!showAnswer) {
      reset();
      start();
    }
  }, [currentQuestionIndex, showAnswer]);

  const handleShowAnswer = () => {
    setShowAnswer(true);
    pause();
  };

  const handleAnswerSelect = (answer: "vrai" | "faux") => {
    setSelectedAnswer(answer);
    handleShowAnswer();

    if (answer === currentQuestion.correct) {
      correctSound.play();
    } else {
      wrongSound.play();
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setShowAnswer(false);
      setSelectedAnswer(null);
    } else {
      navigate("/finish");
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setShowAnswer(false);
      setSelectedAnswer(null);
    }
  };

  const handleResetTimer = () => {
    reset();
    setShowAnswer(false);
    setSelectedAnswer(null);
    start();
  };

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onSpace: () => !showAnswer && handleShowAnswer(),
    onRightArrow: () => {
      if (!showAnswer) {
        handleShowAnswer();
      } else if (currentQuestionIndex < questions.length - 1) {
        handleNext();
      }
    },
    onLeftArrow: () => currentQuestionIndex > 0 && handlePrevious(),
    onR: () => handleResetTimer(),
    on1: () => !showAnswer && handleAnswerSelect("vrai"),
    on2: () => !showAnswer && handleAnswerSelect("faux"),
  });

  const getAnswerButtonVariant = (answer: "vrai" | "faux") => {
    if (!showAnswer) return "default";
    if (currentQuestion.correct === answer) return "default";
    return "secondary";
  };

  const getAnswerButtonClasses = (answer: "vrai" | "faux") => {
    if (!showAnswer) return "";
    if (currentQuestion.correct === answer) {
      return "bg-success hover:bg-success border-4 border-success/50 scale-105";
    }
    if (selectedAnswer === answer && answer !== currentQuestion.correct) {
      return "bg-destructive hover:bg-destructive border-4 border-destructive/50";
    }
    return "opacity-50";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-8">
      {/* Timer */}
      <Timer timeLeft={timeLeft} totalTime={TIMER_DURATION} progress={progress} />

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <QuestionCard
          question={currentQuestion}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
        />
      </AnimatePresence>

      {/* Answer Buttons or Navigation */}
      <div className="flex flex-col gap-4 md:gap-12 justify-between items-center w-full max-w-2xl px-4">
        {!showAnswer ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-14 w-full">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <AnimatedButton
                  text="Vrai"
                  actionText="Tu es sûr?"
                  icon={<FaRegCircleCheck className="size-10" />}
                  theme="emerald"
                  orientation="horizontal"
                  onClick={() => handleAnswerSelect("vrai")}
                  className="w-full"

                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <AnimatedButton
                  text="Faux"
                  actionText="Tu es sûr?"
                  icon={<FaRegCircleCheck className="size-10" />}
                  theme="rose"
                  orientation="horizontal"
                  onClick={() => handleAnswerSelect("faux")}
                  className="w-full"

                />
              </motion.div>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full px-0">

              <AnimatedButton
                text="Afficher la réponse"
                actionText="Afficher la réponse"
                icon={<SiRevealdotjs className="size-10" />}
                theme="blue"
                orientation="horizontal"
                onClick={() => handleShowAnswer()}
                className="w-full"
              />
            </motion.div>
          </>
        ) : (
          <>
            <div
              className="fixed left-auto right-0 top-1/2 h-auto w-full sm:w-sm opacity-40 md:top-1/4"
            >
              {currentQuestion.correct === 'vrai' ? (
                <DotLottieReact
                  src="/vrai.lottie"
                  loop
                  autoplay
                  className="w-full h-full"
                />
              ) : (
                <DotLottieReact
                  src="/faux.lottie"
                  loop
                  autoplay
                  className=""
                />
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full mb-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <AnimatedButton
                  text="Recommencer le timer"
                  actionText="Recommencer le timer"
                  icon={<LuRefreshCcw className="size-10" />}
                  theme="blue"
                  orientation="horizontal"
                  onClick={() => handleResetTimer()}
                  className="w-full"
                />
              </motion.div>
            </motion.div>

            <NavigationButtons
              onPrevious={handlePrevious}
              onNext={handleNext}
              canGoPrevious={currentQuestionIndex > 0}
              canGoNext={true}
              isLastQuestion={currentQuestionIndex === questions.length - 1}
            />
          </>
        )}
      </div>

      {/* Keyboard shortcuts hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-sm text-muted-foreground text-center mt-4"
      >
        Raccourcis : Espace = Afficher | ← → = Navigation | R = Reset | 1 = Vrai | 2 = Faux
      </motion.div>
    </div>
  );
};

export default Quiz;
