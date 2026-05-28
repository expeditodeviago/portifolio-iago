import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { portfolioData, getIcon } from '../data/portfolioData';
import CosmicBackground from '../components/CosmicBackground';
import CelestialSound from '../components/CelestialSound';
import { ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';

const SectionHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="mb-12">
    <motion.span 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="text-accent font-mono text-[10px] uppercase tracking-[0.5em] block mb-2"
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-4xl md:text-5xl font-black text-white tracking-tighter"
    >
      {title}
    </motion.h2>
  </div>
);

const PhotoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % portfolioData.personalPhotos.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + portfolioData.personalPhotos.length) % portfolioData.personalPhotos.length);
  };

  return (
    <div className="relative group">
      <div className="relative aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden border border-white/10 bg-white/5">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={portfolioData.personalPhotos[currentIndex]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="absolute inset-y-0 left-2 flex items-center">
        <button 
          onClick={prev}
          className="p-2 rounded-full bg-background/50 backdrop-blur-md border border-white/10 text-white hover:bg-accent hover:text-background transition-all opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft size={20} />
        </button>
      </div>

      <div className="absolute inset-y-0 right-2 flex items-center">
        <button 
          onClick={next}
          className="p-2 rounded-full bg-background/50 backdrop-blur-md border border-white/10 text-white hover:bg-accent hover:text-background transition-all opacity-0 group-hover:opacity-100"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {portfolioData.personalPhotos.map((_, i) => (
          <div 
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIndex ? 'bg-accent w-4' : 'bg-white/20'}`}
          />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <main className="min-h-screen bg-[#0a0a0c] selection:bg-accent/30 selection:text-white overflow-x-hidden">
      <CosmicBackground />
      <CelestialSound />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-5xl"
        >
          <span className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-[10px] font-mono text-accent uppercase tracking-widest mb-8">
            System Initialized // Cosmic Protocol
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[11rem] font-black text-white tracking-[0.02em] leading-[0.9] lg:leading-[0.85] mb-8">
            IAGO<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">EXPEDITO</span>
          </h1>
          <div className="w-16 h-px bg-accent/40 mx-auto mb-10" />
          <p className="text-xl md:text-2xl text-slate-400 font-extralight max-w-4xl mx-auto leading-relaxed mb-12 tracking-tight">
            Desenhando o futuro através da <span className="text-white font-normal">Arquitetura de Produto</span>, <span className="text-white font-normal">Sistemas Inteligentes</span> e <span className="text-white font-normal">Excelência Operacional</span>.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {portfolioData.socialLinks.map((social) => (
              <a 
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-white/5 bg-white/[0.02] hover:bg-accent hover:text-background transition-all rounded-lg font-mono text-xs uppercase tracking-widest text-white/60"
              >
                {social.label}
              </a>
            ))}
          </div>
        </motion.div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20 hidden md:block">
          <div className="w-px h-24 bg-gradient-to-b from-accent to-transparent" />
        </div>
      </section>

      {/* ABOUT ME SECTION */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <SectionHeader title="Sobre Mim" subtitle="Personal Profile" />
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-xl text-slate-300 font-light leading-relaxed">
                Olá! Sou o <span className="text-white font-bold">Iago</span>. Atualmente sou estudante universitário na <span className="text-accent">Unifan</span> e mergulho fundo no mundo da programação com uma visão que vai além do código.
              </p>
              <p className="text-slate-400 leading-relaxed font-light">
                Meu foco está na <span className="text-white">estruturação lógica de produtos</span> e no desenvolvimento de sistemas que não apenas funcionam, mas evoluem através da <span className="text-white">Inteligência Artificial</span>. Acredito que a tecnologia deve ser o motor da celeridade operacional, unindo a precisão do software com uma visão estratégica de processos.
              </p>
              <div className="pt-8 grid grid-cols-2 gap-8">
                <div>
                  <span className="text-3xl font-black text-white block">UNIFAN</span>
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Instituição Acadêmica</span>
                </div>
                <div>
                  <span className="text-3xl font-black text-white block">HYBRID</span>
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Dev & Ops Vision</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <PhotoCarousel />
            </motion.div>
          </div>
        </div>
      </section>

      {/* EXPERTISE SECTION */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto border-t border-white/5">
        <SectionHeader title="Expertise Técnica" subtitle="Technical Layers" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioData.expertise.map((item, i) => {
            const Icon = getIcon(item.iconName);
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group rounded-2xl"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-accent/5 border border-accent/10 text-accent mb-6 rounded-xl group-hover:scale-110 transition-transform">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-light">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* PORTFOLIO SECTION - NEXUS DASH */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto border-t border-white/5">
        <SectionHeader title="Projetos em Destaque" subtitle="System Analysis" />
        {portfolioData.projects.map((project) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden p-8 lg:p-12 group"
          >
            <div className="space-y-8">
              <div>
                <Link to={`/project/${project.id}`}>
                  <h3 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                </Link>
                <p className="text-accent/60 font-mono text-xs uppercase tracking-widest">
                  {project.tagline}
                </p>
              </div>
              
              <p className="text-slate-400 font-light leading-relaxed text-lg">
                {project.shortDescription}
              </p>

              <div className="space-y-4">
                <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Estrutura do Sistema</h4>
                <ul className="grid grid-cols-1 gap-3">
                  {project.technicalArchitecture.map((arch, i) => (
                    <li key={i} className="flex gap-4 text-xs text-slate-500 items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent/40 mt-1" />
                      {arch}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.techStack.map(tech => (
                  <span key={tech} className="px-3 py-1 bg-accent/5 border border-accent/10 rounded text-[10px] font-mono text-accent">
                    {tech}
                  </span>
                ))}
              </div>

              <Link 
                to={`/project/${project.id}`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-background font-bold rounded-xl hover:bg-accent transition-all group/btn"
              >
                Ver Análise Completa <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>

            <Link to={`/project/${project.id}`} className="relative aspect-video lg:aspect-auto rounded-2xl overflow-hidden border border-white/10 block group-hover:border-accent/30 transition-colors">
              <img 
                src={project.imageUrl} 
                alt={project.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent opacity-60 pointer-events-none" />
            </Link>
          </motion.div>
        ))}
      </section>

      {/* SKILLS BLUEPRINT */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {portfolioData.skills.map((skillGroup) => (
            <div key={skillGroup.category} className="space-y-6">
              <h4 className="text-[10px] font-mono text-accent uppercase tracking-[0.5em]">{skillGroup.category}</h4>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map(item => (
                  <span key={item} className="text-lg font-bold text-white/80 hover:text-white transition-colors cursor-default">
                    {item} <span className="text-accent/20">//</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/5 text-center">
        <p className="text-[10px] font-mono text-white/10 uppercase tracking-[0.5em]">
          Cosmic Architect Framework © 2026 // {portfolioData.name}
        </p>
      </footer>
    </main>
  );
};

export default Home;
