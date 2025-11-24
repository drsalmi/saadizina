import { motion } from "framer-motion";
import { Question } from "@/data/questions";

const images = {
  1: "/illustrations/1.svg",
  2: "/illustrations/2.svg",
  3: "/illustrations/3.svg",
  4: "/illustrations/4.svg",
}

interface QuestionCardProps {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
}
export const QuestionCard = ({
  question,
  currentQuestionIndex,
  totalQuestions
}: QuestionCardProps) => {
  return <motion.div key={question.id} initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} exit={{
    opacity: 0,
    y: -20
  }} transition={{
    duration: 0.3
  }} className="rounded-3xl shadow-none p-8 md:p-12 max-w-3xl w-full bg-white/0 opacity-100">
    <div className="mb-6 text-center">
      <span className="inline-block bg-primary/10 text-primary px-6 py-2 rounded-full text-lg font-semibold">
        Question {currentQuestionIndex + 1} / {totalQuestions}
      </span>
    </div>
    <p className="text-2xl md:text-4xl text-center font-semibold text-foreground leading-relaxed">
      {question.text}
    </p>

    <div className="mt-8">
      <img src={images[question.id]} className="w-auto max-h-[400px] block mx-auto" alt="" />
    </div>
  </motion.div>;
};