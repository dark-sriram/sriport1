import { motion, useScroll } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export const ScrollToTop = () => {
  const { scrollY } = useScroll();
  
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: scrollY.get() > 500 ? 1 : 0,
        y: scrollY.get() > 500 ? 0 : 20,
        display: scrollY.get() > 500 ? 'flex' : 'none'
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 border border-cyan-500/30 text-white shadow-lg shadow-cyan-500/30 flex items-center justify-center z-40"
      aria-label="Scroll to top"
    >
      <ChevronUp size={24} />
    </motion.button>
  );
};