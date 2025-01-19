import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-foundations-primary via-foundations-secondary to-foundations-hover flex items-center justify-center relative overflow-hidden">
      {/* Simple Loading Spinner */}
      <motion.div
        className="w-16 h-16 border-4 border-t-4 border-t-foundations-light border-foundations-dark rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default LoadingSpinner;
