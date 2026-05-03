import React from 'react';
import { Network } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-black py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <Network className="w-5 h-5 text-black" />
            </div>
            <span className="text-lg font-display font-bold tracking-tight">GraphMind</span>
          </div>
          <p className="text-zinc-600 text-sm max-w-xs">
            Optimizing the intersection of biological knowledge structure and artificial intelligence reasoning.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Product</h4>
            <ul className="text-sm text-zinc-500 space-y-2">
               <li><a href="#" className="hover:text-white transition-colors">Simulator</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
               <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Resources</h4>
            <ul className="text-sm text-zinc-500 space-y-2">
               <li><a href="#" className="hover:text-white transition-colors">Graph RAG Whitepaper</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Token Economics</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Legal</h4>
            <ul className="text-sm text-zinc-500 space-y-2">
               <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-zinc-900 flex justify-between items-center text-[10px] uppercase font-mono text-zinc-600 tracking-tighter">
         <span>© 2026 GraphMind Research Labs</span>
         <span>Built for the Token-Efficient Future</span>
      </div>
    </footer>
  );
}
