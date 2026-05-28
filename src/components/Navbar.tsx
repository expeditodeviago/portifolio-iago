import { Link } from 'react-router-dom';
import { Terminal } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <Terminal className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
            <span className="font-bold text-white tracking-tight">Iago Expedito</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link to="/" className="hover:text-accent transition-colors">Portfólio</Link>
            <a href="#expertise" className="hover:text-accent transition-colors">Expertise</a>
            <a href="mailto:contato@iago.com" className="px-4 py-2 bg-accent text-background rounded-full hover:opacity-90 transition-opacity">
              Contato
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
