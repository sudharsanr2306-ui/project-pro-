import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Network, ArrowLeft, Github, Chrome, AlertCircle, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider, githubProvider, db } from '../lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils';

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuthError = (err: any) => {
    console.error(err);
    setError(err.message || 'An unexpected authentication error occurred.');
    setLoading(false);
  };

  const handleSocialLogin = async (provider: any) => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Save/Update user profile in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        userId: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp(), // Only effective on creation if using a specific pattern, but setDoc overwrites. For production, use exists check or separate creation logic.
      }, { merge: true });
      
      navigate('/');
    } catch (err) {
      handleAuthError(err);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName });
        
        await setDoc(doc(db, 'users', result.user.uid), {
          userId: result.user.uid,
          displayName,
          email: result.user.email,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/');
    } catch (err) {
      handleAuthError(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0C0C] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to safety</span>
        </Link>

        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl space-y-8">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Network className="w-7 h-7 text-black" />
            </div>
            <h1 className="text-2xl font-display font-bold">
              {isSignUp ? "Create Architect Account" : "Access Node Root"}
            </h1>
            <p className="text-zinc-500 text-sm">
              {isSignUp ? "Begin your knowledge graph journey." : "Synchronize your knowledge graph identity."}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-xs text-red-400 leading-relaxed">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            <button 
              onClick={() => handleSocialLogin(googleProvider)}
              disabled={loading}
              className="w-full py-3 px-4 bg-white text-black rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-orange-50 transition-colors disabled:opacity-50"
            >
              <Chrome className="w-5 h-5" />
              Continue with Google
            </button>
            <button 
              onClick={() => handleSocialLogin(githubProvider)}
              disabled={loading}
              className="w-full py-3 px-4 bg-zinc-800 text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-zinc-700 transition-colors disabled:opacity-50"
            >
              <Github className="w-5 h-5" />
              Continue with GitHub
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-zinc-900 px-2 text-zinc-600 font-mono">Or use neural link</span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleEmailAuth}>
            {isSignUp && (
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest pl-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="John Architect"
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-700 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
                />
              </div>
            )}
            <div className="space-y-2">
              <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest pl-1">Identifier</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="architect@graphmind.io"
                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-700 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest pl-1">Passkey</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-700 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-orange-500 text-black rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {isSignUp ? "Initialize Protocol" : "Authorize Access"}
            </button>
          </form>

          <div className="text-center space-y-4">
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-zinc-500 hover:text-orange-400 transition-colors"
            >
              {isSignUp ? "Already have a node? Log in" : "New architect? Create account"}
            </button>

            <p className="text-center text-[10px] uppercase font-mono text-zinc-700 tracking-tighter">
              By continuing, you agree to our <a href="#" className="text-zinc-600 hover:underline">Token Use Agreement</a>.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
