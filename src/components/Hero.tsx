import React from 'react';
import { motion } from 'motion/react';
import { Network, ArrowRight, Layers, Bot } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Hero() {
  const { user } = useAuth();

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 text-center max-w-5xl space-y-8">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-sm font-medium"
        >
          <Bot className="w-4 h-4 text-orange-500" />
          <span className="text-zinc-400">The Next Evolution of RAG</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[12vw] sm:text-[10vw] md:text-[8rem] font-display font-bold leading-[0.85] tracking-tighter uppercase"
        >
          Scale <span className="text-orange-500">Knowledge</span><br/>
          Not Cost.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto font-medium"
        >
          Vector embeddings retrieve chunks. Graphs retrieve relationships. 
          Stop dumping irrelevant context into your LLM. Start walking the graph.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          {user ? (
            <a href="#simulator" className="group px-8 py-4 bg-white text-black rounded-full font-bold text-lg flex items-center gap-3 transition-transform hover:scale-105 active:scale-95">
               Try the Simulator
               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          ) : (
            <Link to="/login" className="group px-8 py-4 bg-white text-black rounded-full font-bold text-lg flex items-center gap-3 transition-transform hover:scale-105 active:scale-95">
               Start Experiment
               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
          <button className="px-8 py-4 bg-zinc-900 text-white border border-zinc-800 rounded-full font-bold text-lg hover:bg-zinc-800 transition-colors">
             Read Protocol v1.0
          </button>
        </motion.div>
      </div>

      {/* Floating Metrics */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-12 text-zinc-600 font-mono text-xs uppercase tracking-widest hidden md:flex">
         <div className="flex flex-col items-center gap-2">
            <span className="text-white text-lg font-display">94%</span>
            <span>Token Savings</span>
         </div>
         <div className="w-px h-8 bg-zinc-800" />
         <div className="flex flex-col items-center gap-2">
            <span className="text-white text-lg font-display">Multi-Hop</span>
            <span>Reasoning</span>
         </div>
         <div className="w-px h-8 bg-zinc-800" />
         <div className="flex flex-col items-center gap-2">
            <span className="text-white text-lg font-display">Zero</span>
            <span>Context Bloat</span>
         </div>
      </div>
    </div>
  );
}
