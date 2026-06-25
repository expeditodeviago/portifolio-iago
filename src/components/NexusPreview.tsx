import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Database, Cpu, BarChart3, MessageSquare } from 'lucide-react';

const NexusPreview = () => {
  const [step, setStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const steps = [
    { icon: Database, label: "Ingestão de Dados", detail: "CSV/Excel Detectado" },
    { icon: Cpu, label: "Processamento IA", detail: "Llama-3.1 Engine" },
    { icon: BarChart3, label: "Visualização", detail: "Insights Gerados" }
  ];

  const handleSimulate = () => {
    setIsProcessing(true);
    setStep(0);
  };

  useEffect(() => {
    if (isProcessing && step < steps.length) {
      const timer = setTimeout(() => {
        setStep(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (step === steps.length && isProcessing) {
      const timer = setTimeout(() => setIsProcessing(false), 0);
      return () => clearTimeout(timer);
    }
  }, [isProcessing, step, steps.length]);

  return (
    <div className="bg-black/40 border border-white/10 rounded-2xl p-6 font-mono overflow-hidden relative group">
      <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-[10px] text-white/40 uppercase tracking-[0.2em]">Nexus AI Terminal v3.1</span>
        </div>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
        </div>
      </div>

      <div className="space-y-6">
        {steps.map((s, i) => (
          <div key={i} className={`flex items-center gap-4 transition-all duration-500 ${step > i ? 'opacity-100' : 'opacity-20'}`}>
            <div className={`p-2 rounded-lg border ${step > i ? 'border-accent/40 bg-accent/5 text-accent' : 'border-white/5 text-white/20'}`}>
              <s.icon size={18} />
            </div>
            <div>
              <p className="text-xs text-white font-bold">{s.label}</p>
              <p className="text-[10px] text-white/40">{s.detail}</p>
            </div>
            {step === i && isProcessing && (
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "20px" }}
                className="h-[1px] bg-accent ml-auto"
              />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {step === 3 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-4 bg-accent/5 border border-accent/20 rounded-xl"
          >
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare size={12} className="text-accent" />
              <span className="text-[9px] text-accent font-bold uppercase">Nexus AI Insight</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed italic">
              "Detectada anomalia positiva em vendas no Q3. Projeção de crescimento de 15.4% baseada na tendência atual de mercado."
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={handleSimulate}
        disabled={isProcessing}
        className={`mt-8 w-full py-3 rounded-lg border border-white/10 text-[10px] uppercase tracking-widest transition-all ${isProcessing ? 'bg-white/5 text-white/20' : 'bg-white/5 text-white hover:bg-accent hover:text-background hover:border-accent font-bold'}`}
      >
        {isProcessing ? "Processando Nexus Protocol..." : "Simular Análise Inteligente"}
      </button>

      {/* Grid background effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
    </div>
  );
};

export default NexusPreview;
