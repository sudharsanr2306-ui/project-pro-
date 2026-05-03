import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Search, GitBranch, GitMerge, FileCode, ShieldAlert, Cpu, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import GraphCanvas from './GraphCanvas';

interface Node {
  id: string;
  type: 'file' | 'function' | 'dependency';
  label: string;
}

interface Edge {
  from: string;
  to: string;
  label: string;
}

export default function GitHubAnalyzer() {
  const [repoUrl, setRepoUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<{ nodes: Node[], edges: Edge[], insights: string[] } | null>(null);

  const analyze = () => {
    if (!repoUrl) return;
    setIsAnalyzing(true);
    setReport(null);

    setTimeout(() => {
      setReport({
        nodes: [
          { id: 'f1', type: 'file', label: 'auth.ts' },
          { id: 'f2', type: 'file', label: 'db.ts' },
          { id: 'fn1', type: 'function', label: 'validateSession()' },
          { id: 'd1', type: 'dependency', label: 'jsonwebtoken' }
        ],
        edges: [
          { from: 'f1', to: 'fn1', label: 'defines' },
          { from: 'fn1', to: 'd1', label: 'calls' },
          { from: 'f2', to: 'f1', label: 'imports' }
        ],
        insights: [
          "Logic Gap: validateSession() is imported in db.ts but never executed on write operations.",
          "Circular Dependency: auth.ts ↔ db.ts (Higher token cost for context retrieval)",
          "Vulnerability: Dependency 'jsonwebtoken' version is 2 years old."
        ]
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-zinc-900">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        <div className="lg:w-1/3 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-white">
            <Github className="w-3 h-3 text-white" />
            REPO_INDEXER_BETA
          </div>
          <h2 className="text-4xl font-display font-bold leading-tight">Index entire <br/><span className="text-orange-500">codebases.</span></h2>
          <p className="text-zinc-500">
            Vector search sees files as isolated chunks. GraphMind sees your source code as a unified execution graph, finding bugs across multiple hops of logic.
          </p>

          <div className="space-y-4 pt-4">
            <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl flex items-center gap-4">
               <ShieldAlert className="w-6 h-6 text-orange-500" />
               <div className="text-xs text-zinc-400">Identify cross-module vulnerabilities that linear search misses.</div>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl flex items-center gap-4">
               <GitMerge className="w-6 h-6 text-emerald-500" />
               <div className="text-xs text-zinc-400">Map imports and function calls into a queryable knowledge fabric.</div>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full space-y-8">
           <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500/20 via-orange-500 to-orange-500/20" />
              
              <div className="space-y-6">
                 <div>
                    <h3 className="text-lg font-bold mb-2">GitHub Repo URL</h3>
                    <div className="flex gap-4">
                       <input 
                         type="text" 
                         value={repoUrl}
                         onChange={(e) => setRepoUrl(e.target.value)}
                         placeholder="https://github.com/facebook/react"
                         className="flex-1 bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-orange-500 outline-none"
                       />
                       <button 
                         onClick={analyze}
                         disabled={isAnalyzing || !repoUrl}
                         className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-orange-50 disabled:opacity-50 transition-all flex items-center gap-2"
                       >
                         {isAnalyzing ? "Indexing..." : "Analyze"}
                         <Search className="w-4 h-4" />
                       </button>
                    </div>
                 </div>

                 <AnimatePresence mode="wait">
                    {isAnalyzing && (
                      <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="py-12 flex flex-col items-center justify-center gap-4"
                      >
                         <div className="relative">
                            <div className="w-12 h-12 border-4 border-zinc-800 border-t-orange-500 rounded-full animate-spin" />
                            <Cpu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" />
                         </div>
                         <div className="text-xs font-mono text-zinc-500 animate-pulse uppercase tracking-[0.2em]">Walking Dependency Graph...</div>
                      </motion.div>
                    )}

                    {report && !isAnalyzing && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
                        className="space-y-8 pt-4"
                      >
                         <div className="space-y-4">
                            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Logic Traversal Map</div>
                            <GraphCanvas nodes={report.nodes} edges={report.edges} />
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                               <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Extracted Knowledge Nodes</div>
                               <div className="space-y-2">
                                  {report.nodes.map((n, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 bg-black/40 border border-zinc-800 rounded-lg group">
                                       <div className={cn(
                                          "w-8 h-8 rounded-md flex items-center justify-center",
                                          n.type === 'file' ? 'bg-blue-500/10 text-blue-500' : 
                                          n.type === 'function' ? 'bg-purple-500/10 text-purple-500' : 'bg-orange-500/10 text-orange-500'
                                       )}>
                                          {n.type === 'file' ? <FileCode className="w-4 h-4" /> : <GitBranch className="w-4 h-4" />}
                                       </div>
                                       <div className="flex-1">
                                          <div className="text-sm font-medium text-white">{n.label}</div>
                                          <div className="text-[10px] text-zinc-600 uppercase font-mono">{n.type}</div>
                                       </div>
                                    </div>
                                  ))}
                               </div>
                            </div>

                            <div className="space-y-4">
                               <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Graph Insights</div>
                               <div className="space-y-4">
                                  {report.insights.map((insight, i) => (
                                    <div key={i} className="flex gap-3">
                                       <ChevronRight className="w-4 h-4 text-orange-500 shrink-0 mt-1" />
                                       <p className="text-sm text-zinc-400 italic leading-relaxed">"{insight}"</p>
                                    </div>
                                  ))}
                               </div>
                            </div>
                         </div>
                      </motion.div>
                    )}
                 </AnimatePresence>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
