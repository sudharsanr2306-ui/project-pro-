import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TokenSimulator from './components/TokenSimulator';
import ProblemExplainer from './components/ProblemExplainer';
import DeepDive from './components/DeepDive';
import GitHubAnalyzer from './components/GitHubAnalyzer';
import Footer from './components/Footer';
import LoginPage from './pages/Login';

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0C0C0C]">
      <Navbar />
      <main>
        <Hero />
        <ProblemExplainer />
        <DeepDive />
        <GitHubAnalyzer />
        <TokenSimulator />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
