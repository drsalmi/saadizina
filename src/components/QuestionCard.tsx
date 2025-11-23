import { motion } from "framer-motion";
import { Question } from "@/data/questions";
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
  }} className="rounded-3xl shadow-xl p-8 md:p-12 max-w-3xl w-full bg-white/0 opacity-100">
      <div className="mb-6 text-center">
        <span className="inline-block bg-primary/10 text-primary px-6 py-2 rounded-full text-lg font-semibold">
          Question {currentQuestionIndex + 1} / {totalQuestions}
        </span>
      </div>
      <p className="text-2xl md:text-4xl text-center font-semibold text-foreground leading-relaxed">
        {question.text}
      </p>
    </motion.div>;
};