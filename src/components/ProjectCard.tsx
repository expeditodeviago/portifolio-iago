import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';
import type { Project } from '../data/portfolioData';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative glass-card overflow-hidden hover:border-accent/40 transition-all duration-500"
    >
      <div className="aspect-[16/9] overflow-hidden relative">
        <div className="absolute inset-0 bg-background/60 group-hover:bg-background/20 transition-colors z-10" />
        <img 
          src={project.imageUrl} 
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
        />
        <div className="absolute top-4 left-4 z-20">
          <div className="bg-background/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-mono text-white/70 uppercase tracking-widest">Active System</span>
          </div>
        </div>
      </div>
      
      <div className="p-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.slice(0, 3).map(tech => (
            <span key={tech} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm bg-accent/5 text-accent border border-accent/20 font-mono">
              {tech}
            </span>
          ))}
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-accent/60 text-xs font-mono mb-4 uppercase tracking-tighter">
          {project.tagline}
        </p>
        
        <p className="text-slate-400 text-sm mb-8 line-clamp-2 leading-relaxed">
          {project.shortDescription}
        </p>
        
        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <Link 
            to={`/project/${project.id}`}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white hover:text-accent transition-all group/link"
          >
            Technical Analysis <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
          
          <div className="flex gap-4">
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white transition-colors"
                title="Live Preview"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <ShieldCheck className="w-4 h-4 text-white/10" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
