import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ResultConfetti } from "@/components/ResultConfetti";
import { Home, RotateCcw } from "lucide-react";

const Finish = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <ResultConfetti />

      <motion.div
        className="text-center z-10 max-w-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-8xl mb-8"
          animate={{
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        >
          🎉
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold text-primary mb-6 drop-shadow-lg"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Bravo !
        </motion.h1>

        <motion.p
          className="text-2xl md:text-4xl text-foreground mb-12 font-medium"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Tu as terminé le quiz ! 🦊
        </motion.p>

        <motion.div
          className="bg-card rounded-3xl shadow-2xl p-8 mb-8 border-4 border-primary/20"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed">
            Félicitations pour avoir complété toutes les questions sur le fennec ! 
            Tu as appris plein de choses sur cet animal fascinant du désert.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => navigate("/quiz")}
              size="lg"
              className="text-xl h-16 px-8 rounded-2xl font-semibold shadow-lg bg-primary hover:bg-primary/90"
            >
              <RotateCcw className="mr-2 h-6 w-6" />
              Recommencer le quiz
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => navigate("/")}
              size="lg"
              variant="secondary"
              className="text-xl h-16 px-8 rounded-2xl font-semibold shadow-lg"
            >
              <Home className="mr-2 h-6 w-6" />
              Retour à l'accueil
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Finish;
