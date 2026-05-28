import { getIcon, portfolioData } from '../data/portfolioData';
import { motion } from 'framer-motion';

const ExpertiseSection = () => {
  return (
    <section className="py-24 px-4 md:px-8 bg-white/[0.02] border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-accent font-mono text-xs tracking-[0.3em] uppercase mb-4 block"
            >
              Core Competencies
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold tracking-tighter mb-6"
            >
              Arquitetura <br />
              <span className="text-white/30">de Alto Impacto</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-slate-400 text-sm font-light leading-relaxed mb-8"
            >
              Especializado em pontuar o equilíbrio entre robustez técnica e agilidade de entrega, transformando visões operacionais em infraestruturas escaláveis.
            </motion.p>
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolioData.expertise.map((item, index) => {
              const Icon = getIcon(item.iconName);
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 glass-card hover:bg-white/10 transition-colors"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="text-accent w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400 text-sm font-light leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
