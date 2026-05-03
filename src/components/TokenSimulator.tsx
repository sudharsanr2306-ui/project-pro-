import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, Share2, Zap, AlertCircle, CheckCircle2, ChevronRight, Calculator } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface SIM_RESULT {
  method: 'Vector RAG' | 'Graph RAG';
  tokens: number;
  context: string;
  reasoning: string[];
  cost: number;
}

export default function TokenSimulator() {
  const [query, setQuery] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [results, setResults] = useState<{ vector: SIM_RESULT; graph: SIM_RESULT } | null>(null);

  const simulate = () => {
    if (!query) return;
    setIsSimulating(true);
    setResults(null);

    // Simulated results logic
    setTimeout(() => {
      setResults({
        vector: {
          method: 'Vector RAG',
          tokens: Math.floor(Math.random() * (4000 - 1500) + 1500),
          context: "Physics is a branch of science... Einstein published his work while at the Swiss Patent Office. The General Theory of Relativity describes gravity as a geometric property of space and time... (12 more pages of related but non-essential context)",
          reasoning: ["Retrieve all chunks mentioning Einstein", "Retrieve all chunks mentioning relativity", "Load entire document for safety"],
          cost: 0.12
        },
        graph: {
          method: 'Graph RAG',
          tokens: Math.floor(Math.random() * (400 - 150) + 150),
          context: "Albert Einstein (Entity) → Works At → Swiss Patent Office (Entity). Authored → General Relativity (Concept). Published In → 1915.",
          reasoning: ["Identified Entity: Albert Einstein", "Traversed relationship: Works At", "Focused on relevant connection"],
          cost: 0.008
        }
      });
      setIsSimulating(false);
    }, 1500);
  };

  return (
    <section id="simulator" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-medium uppercase tracking-wider">
            <Zap className="w-3 h-3" />
            Live Efficiency Simulator
          </div>
          <h2 className="text-4xl md:text-5xl font-display leading-tight">
            Watch tokens <span className="text-orange-500">burn</span> in real-time.
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl">
            Enter a complex multi-hop question. We’ll simulate how traditional Vector search retrieves massive context vs. how a Knowledge Graph pinpoints the exact answer path.
          </p>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000"></div>
            <div className="relative bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center gap-4">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Where was the author of General Relativity working in 1915?"
                className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder:text-zinc-600 font-sans"
              />
              <button
                onClick={simulate}
                disabled={isSimulating || !query}
                className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-black font-semibold px-6 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-orange-500/20"
              >
                {isSimulating ? "Simulating..." : "Compare"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 flex items-start gap-4">
               <AlertCircle className="w-5 h-5 text-red-500 mt-1" />
               <div>
                  <div className="text-sm font-medium text-white mb-1">Vector Search Chunks</div>
                  <div className="text-xs text-zinc-500">Retrieves similar semantic strings, leading to context bloat.</div>
               </div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 flex items-start gap-4">
               <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-1" />
               <div>
                  <div className="text-sm font-medium text-white mb-1">Graph Relationships</div>
                  <div className="text-xs text-zinc-500">Retrieves exact entities and hops, minimizing token load.</div>
               </div>
            </div>
          </div>
        </div>

        <div className="flex-1 min-h-[500px]">
          <AnimatePresence mode="wait">
            {!results && !isSimulating && (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="h-full flex items-center justify-center border-2 border-dashed border-zinc-800 rounded-3xl"
              >
                <div className="text-center space-y-4">
                  <Database className="w-12 h-12 text-zinc-700 mx-auto" />
                  <p className="text-zinc-600 font-mono text-sm max-w-[200px]">Waiting for query analysis...</p>
                </div>
              </motion.div>
            )}

            {isSimulating && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="h-full flex items-center justify-center p-8 bg-zinc-900/30 rounded-3xl border border-zinc-800"
              >
                <div className="space-y-8 w-full max-w-md">
                   <div className="space-y-2">
                     <div className="flex justify-between text-xs font-mono text-zinc-500">
                        <span>SEARCHING VECTOR SPACE...</span>
                        <span>0.8s</span>
                     </div>
                     <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-red-500" 
                          initial={{ width: 0 }} animate={{ width: '80%' }} 
                          transition={{ duration: 1.2 }}
                        />
                     </div>
                   </div>
                   <div className="space-y-2">
                     <div className="flex justify-between text-xs font-mono text-zinc-500">
                        <span>WALKING ENTITY GRAPH...</span>
                        <span>0.4s</span>
                     </div>
                     <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-emerald-500" 
                          initial={{ width: 0 }} animate={{ width: '100%' }} 
                          transition={{ duration: 0.8 }}
                        />
                     </div>
                   </div>
                </div>
              </motion.div>
            )}

            {results && (
              <motion.div 
                key="results"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic RAG Card */}
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="p-4 bg-red-500/10 border-b border-zinc-800 flex justify-between items-center">
                       <span className="text-xs font-bold text-red-500 uppercase tracking-tighter tracking-widest font-display">Noisy Context</span>
                       <span className="text-xs font-mono text-zinc-500">{results.vector.tokens} tokens</span>
                    </div>
                    <div className="p-5 space-y-4">
                       <div className="text-sm font-mono text-zinc-400 h-32 overflow-hidden mask-fade leading-relaxed">
                          {results.vector.context}
                       </div>
                       <div className="pt-4 border-t border-zinc-800 flex justify-between items-center">
                          <span className="text-2xl font-display font-medium text-white">${results.vector.cost.toFixed(3)}</span>
                          <span className="text-[10px] text-zinc-600 uppercase font-mono">Est Cost / Query</span>
                       </div>
                    </div>
                  </div>

                  {/* Graph RAG Card */}
                  <div className="bg-zinc-900 border border-emerald-500/20 rounded-2xl overflow-hidden shadow-2xl relative">
                    <div className="absolute top-0 right-0 p-2">
                       <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                    </div>
                    <div className="p-4 bg-emerald-500/10 border-b border-zinc-800 flex justify-between items-center">
                       <span className="text-xs font-bold text-emerald-500 uppercase tracking-tighter tracking-widest font-display">Precision Context</span>
                       <span className="text-xs font-mono text-zinc-500">{results.graph.tokens} tokens</span>
                    </div>
                    <div className="p-5 space-y-4">
                       <div className="text-sm font-mono text-white h-32 leading-relaxed">
                          {results.graph.context}
                       </div>
                       <div className="pt-4 border-t border-zinc-800 flex justify-between items-center">
                          <div className="flex flex-col">
                             <span className="text-2xl font-display font-medium text-emerald-400">${results.graph.cost.toFixed(4)}</span>
                             <span className="text-[10px] text-emerald-500/60 font-bold">~94% CHEAPER</span>
                          </div>
                          <span className="text-[10px] text-zinc-600 uppercase font-mono">Est Cost / Query</span>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-500 text-black p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                   <div className="flex items-center gap-4">
                      <div className="p-3 bg-black/10 rounded-xl">
                         <Calculator className="w-8 h-8" />
                      </div>
                      <div>
                         <div className="text-xl font-display font-bold leading-none">Annual Savings Estimate</div>
                         <div className="text-sm font-medium opacity-80">Based on 10k queries/month across 100 users.</div>
                      </div>
                   </div>
                   <div className="text-4xl font-display font-bold tracking-tighter">
                      ${( (results.vector.cost - results.graph.cost) * 1000 * 12).toLocaleString()}
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
