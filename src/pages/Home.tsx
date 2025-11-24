import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LuCirclePlay } from "react-icons/lu";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating background elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-primary/50 rounded-full blur-lg"
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/40 rounded-full blur-lg"
        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-40 h-40 bg-accent/30 rounded-full blur-lg"
        animate={{ y: [0, -20, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-2/3 left-1/4 size-80 bg-violet-600/30 rounded-full blur-2xl"
        animate={{ y: [0, -20, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="text-center z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-8xl font-bold text-primary mb-4 drop-shadow-lg">
            Quiz Vrai ou Faux
          </h1>
          <p className="text-3xl md:text-5xl text-foreground/80 font-medium">
            CE3 - Testez vos connaissances !
          </p>
        </motion.div>

        <motion.div
          className="text-7xl mb-8 mt-6"
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🦊
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            onClick={() => navigate("/quiz")}
            className="text-4xl inline-flex text-white items-center h-20 px-16 rounded-full shadow-2xl bg-primary hover:bg-primary/90 font-semibold"
          >
            <LuCirclePlay className="mr-5  size-10" />
            Commencer le Quiz
          </button>
        </motion.div>

        <motion.p
          className="mt-12 text-muted-foreground text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          4 questions sur le fennec vous attendent !
        </motion.p>
        <motion.p
          className=" fixed bottom-4 left-1/2 transform -translate-x-1/2 text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Fait avec ❤️ pour Mle: SAADI Zina
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Home;
