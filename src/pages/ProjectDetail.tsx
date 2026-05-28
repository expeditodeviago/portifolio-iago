import { useParams, Link } from 'react-router-dom';
import { portfolioData } from '../data/portfolioData';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Cpu, Zap, Code2 } from 'lucide-react';
import { useEffect } from 'react';
import CosmicBackground from '../components/CosmicBackground';

const ProjectDetail = () => {
  const { id } = useParams();
  const project = portfolioData.projects.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link to="/" className="text-accent hover:underline flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Return to Base
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10"
    >
      <CosmicBackground />
      <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-12 font-mono text-xs uppercase tracking-widest">
        <ArrowLeft className="w-4 h-4" /> Back to Terminal
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-accent font-mono text-xs tracking-[0.3em] uppercase mb-4 block">
              Case Study / {project.id}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
              {project.title}
            </h1>
            <p className="text-xl text-slate-400 font-light mb-8 leading-relaxed">
              {project.tagline}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              {project.techStack.map(tech => (
                <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-sm text-[10px] font-mono text-white/50 uppercase tracking-widest">
                  {tech}
                </span>
              ))}
            </div>

            {project.liveUrl && (
              <a 
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-background font-bold rounded-lg hover:shadow-[0_0_20px_rgba(222,255,154,0.4)] transition-all"
              >
                Access Live System <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-video rounded-2xl overflow-hidden border border-white/10"
        >
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/5 pt-16">
        <div className="md:col-span-2 space-y-16">
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Code2 className="text-accent w-5 h-5" />
              <h3 className="text-xl font-bold">Resumo Executivo</h3>
            </div>
            <p className="text-slate-400 font-light leading-relaxed text-lg">
              {project.fullDescription}
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <Cpu className="text-accent w-5 h-5" />
              <h3 className="text-xl font-bold">Arquitetura Técnica</h3>
            </div>
            <ul className="space-y-4">
              {project.technicalArchitecture.map((item, i) => (
                <li key={i} className="flex gap-4 text-slate-400 font-light">
                  <span className="text-accent font-mono">0{i+1}</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <Zap className="text-accent w-5 h-5" />
              <h3 className="text-xl font-bold">Desafios & Performance</h3>
            </div>
            <p className="text-slate-400 font-light leading-relaxed">
              {project.challenges}
            </p>
          </section>
        </div>

        <aside className="space-y-8">
          <div className="p-8 glass-card border-accent/20">
            <div className="flex items-center gap-3 mb-6">
              <Code2 className="text-accent w-5 h-5" />
              <h3 className="text-lg font-bold">Tech Stack</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map(tech => (
                <span key={tech} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </motion.main>
  );
};

export default ProjectDetail;
