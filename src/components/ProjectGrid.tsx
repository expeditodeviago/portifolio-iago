import ProjectCard from './ProjectCard';
import { portfolioData } from '../data/portfolioData';
import { motion } from 'framer-motion';

const ProjectGrid = () => {
  return (
    <section id="projects" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-accent font-mono text-xs tracking-[0.3em] uppercase mb-4 block"
          >
            Engineering Output
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold tracking-tighter"
          >
            Core <span className="text-white/30">Developments</span>
          </motion.h2>
        </div>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-slate-400 max-w-md text-sm font-light leading-relaxed"
        >
          Sistemas complexos projetados para escalabilidade horizontal, segurança absoluta e processamento de dados de alto desempenho.
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {portfolioData.projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ProjectGrid;
