import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import { portfolioData } from './data/portfolioData';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-6 py-4 bg-background/80 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
        <Link to="/" className="font-mono text-xs sm:text-sm tracking-tighter text-white hover:text-accent transition-colors">
          IAGO_EXPEDITO <span className="hidden sm:inline">// PRODUCT_ARCHITECT</span>
        </Link>
        <div className="flex gap-4">
          {portfolioData.socialLinks.map((social) => (
            <a 
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono text-white/40 hover:text-white transition-colors"
            >
              {social.label.toUpperCase()}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-slate-400 font-sans selection:bg-accent/30 selection:text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
        
        <footer className="py-12 px-6 border-t border-white/5 text-center md:text-left">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-[10px] font-mono opacity-20 uppercase tracking-[0.5em]">
              Architectural Framework v1.0 // {portfolioData.name}
            </span>
            <div className="flex gap-6 opacity-40">
               <span className="text-[10px] font-mono uppercase tracking-widest">Unifan Academic Profile</span>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
