import React from 'react';
import { motion } from 'motion/react';
import { Database, Share2, Search, BrainCircuit, TrendingDown, Target } from 'lucide-react';

const features = [
  {
    title: "The Retrieval Paradox",
    desc: "Vector search retrieves semantic neighbors, but often fails to bridge conceptual gaps across distant document chunks.",
    icon: Database,
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    title: "Multi-Hop Reasoning",
    desc: "Follow relationships across entities (A → B → C) to answer complex queries that standard RAG would miss completely.",
    icon: Share2,
    color: "text-orange-500",
    bg: "bg-orange-500/10"
  },
  {
    title: "Context Minimization",
    desc: "Send only the exact 'facts' required. Reduce input tokens by up to 90% without losing reasoning depth.",
    icon: TrendingDown,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  },
  {
    title: "Deterministic Paths",
    desc: "Unlike abstract vector similarity, graph paths are auditable and traceable. You know exactly why the LLM got the answer.",
    icon: Target,
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  }
];

export default function ProblemExplainer() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto space-y-16">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-5xl font-display font-bold">Why RAG is breaking your budget</h2>
        <p className="text-zinc-500 max-w-2xl mx-auto">Scaling LLM applications with traditional RAG leads to exponential token waste. Knowledge Graphs provide a precision surgical alternative.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors group"
          >
            <div className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <f.icon className={`w-6 h-6 ${f.color}`} />
            </div>
            <h3 className="text-xl font-bold mb-3">{f.title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Visual Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-12">
        <div className="p-1 rounded-3xl bg-gradient-to-br from-zinc-800 to-transparent">
          <div className="bg-black rounded-[calc(1.5rem-1px)] p-8 h-full space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">Vector Retrieval (Standard)</span>
              <div className="px-3 py-1 rounded-full bg-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest">Inefficient</div>
            </div>
            <div className="space-y-4">
               {['Doc Chunk 1 (Similar Keywords)', 'Doc Chunk 2 (Noisy Header)', 'Doc Chunk 3 (Semantic Neighbor)'].map((t, i) => (
                 <div key={i} className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg text-xs font-mono text-zinc-400">
                    {t}...
                 </div>
               ))}
               <div className="text-center pt-2">
                 <div className="text-2xl font-display font-bold">~4,000 Tokens</div>
                 <div className="text-xs text-zinc-600 font-mono">Dumb Data Load</div>
               </div>
            </div>
          </div>
        </div>

        <div className="p-1 rounded-3xl bg-gradient-to-br from-orange-500/30 to-transparent">
          <div className="bg-black rounded-[calc(1.5rem-1px)] p-8 h-full space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">Graph Traversal (Modern)</span>
              <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-widest">Precision</div>
            </div>
            <div className="flex items-center justify-center py-10 gap-4">
               <div className="w-12 h-12 rounded-full border border-orange-500/50 flex items-center justify-center text-[10px] text-orange-500 font-bold">A</div>
               <div className="w-8 h-px bg-zinc-800" />
               <div className="w-12 h-12 rounded-full border border-orange-500 flex items-center justify-center text-[10px] text-orange-500 font-bold shadow-[0_0_15px_rgba(249,115,22,0.3)]">B</div>
               <div className="w-8 h-px bg-zinc-800" />
               <div className="w-12 h-12 rounded-full border border-orange-500/50 flex items-center justify-center text-[10px] text-orange-500 font-bold">C</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-display font-bold text-emerald-400">~250 Tokens</div>
              <div className="text-xs text-zinc-600 font-mono">Structured Context Only</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
