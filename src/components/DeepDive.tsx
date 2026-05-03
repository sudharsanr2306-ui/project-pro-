import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Cpu, Globe, Zap, ShieldCheck, Microscope } from 'lucide-react';

const specs = [
  {
    title: "Graph Extraction Engine",
    detail: "Uses LLM-based entity-relation extraction to transform unstructured PDF/MD data into a structured triad format (Subject, Predicate, Object).",
    icon: Cpu
  },
  {
    title: "Multi-Hop Traversal",
    detail: "Graph query algorithms (Gremlin/Cypher) traverse relationships up to 5 hops away, identifying non-obvious connections standard RAG ignores.",
    icon: Globe
  },
  {
    title: "Dynamic Token Pruning",
    detail: "Proprietary pruning logic filters out 90% of non-essential noise from the retrieved graph path before context injection.",
    icon: Zap
  }
];

export default function DeepDive() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-zinc-900">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-white">
            <Microscope className="w-3 h-3 text-orange-500" />
            TECHNICAL_SPEC_V1.0
          </div>
          <h2 className="text-4xl font-display font-bold leading-tight">Beyond the <br/><span className="text-orange-500">Vector Chunk.</span></h2>
          <p className="text-zinc-500 leading-relaxed">
            While vector embeddings are great for shallow similarity, they struggle with "reasoning at scale." GraphMind bridges the gap by treating your data as a living web of knowledge.
          </p>
          <div className="pt-6 space-y-4">
            <div className="flex items-center gap-3 text-sm text-zinc-400">
              <ShieldCheck className="w-5 h-5 text-emerald-500/50" />
              <span>Verifiable Reasoning Paths</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-400">
              <ShieldCheck className="w-5 h-5 text-emerald-500/50" />
              <span>90% Reduction in LLM Input Delay</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          {specs.map((spec, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-3xl space-y-4 hover:bg-zinc-900/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <spec.icon className="w-5 h-5 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold">{spec.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{spec.detail}</p>
            </motion.div>
          ))}
          
          <div className="p-8 bg-orange-500/5 border border-orange-500/10 rounded-3xl flex flex-col justify-between group">
             <div className="text-xs font-mono text-orange-500/60 uppercase tracking-widest mb-4">Whitepaper Download</div>
             <h3 className="text-xl font-bold mb-4">Read our research on Neural-Symbolic Hybrid RAG.</h3>
             <button className="w-fit text-sm font-bold flex items-center gap-2 text-orange-500 group-hover:gap-3 transition-all">
               Get PDF Summary <BookOpen className="w-4 h-4" />
             </button>
          </div>
        </div>
      </div>
    </section>
  );
}
