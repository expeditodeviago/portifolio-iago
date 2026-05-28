import { Layout, Database, Zap, Cpu, Code2, Globe, Mail } from 'lucide-react';

// Import local images
import nexusDashImg from '../assets/images/dashvizion-pro.png';
import userPhoto1 from '../assets/images/1.jpg';
import userPhoto2 from '../assets/images/2.jpeg';
import userPhoto3 from '../assets/images/3.jpg';
import userPhoto4 from '../assets/images/4.jpeg';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  technicalArchitecture: string[];
  challenges: string;
  securityMeasures: string[];
  techStack: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface Expertise {
  title: string;
  description: string;
  iconName: 'Layout' | 'Database' | 'Zap' | 'Cpu' | 'Code2' | 'Globe';
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface PortfolioData {
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  bio: string;
  personalPhotos: string[];
  socialLinks: SocialLink[];
  expertise: Expertise[];
  projects: Project[];
  skills: {
    category: string;
    items: string[];
  }[];
}

// Updated: 2026-05-28 13:40
export const portfolioData: PortfolioData = {
  name: "Iago Expedito",
  firstName: "Iago",
  lastName: "Expedito",
  title: "Iago Expedito | Product Architect & Software Engineer",
  bio: "Estudante universitário na Unifan. Programador com foco na estruturação lógica de produtos, inteligência artificial (sistemas evolutivos) e celeridade operacional. Possui um perfil híbrido que une desenvolvimento de software com visão estratégica de processos.",
  
  personalPhotos: [userPhoto1, userPhoto2, userPhoto3, userPhoto4],

  socialLinks: [
    { label: "Instagram", url: "https://www.instagram.com/iagoexpedito/" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/iago-expedito-cristino-martins-duarte-3628531b2/" },
    { label: "GitHub", url: "https://github.com/expeditodeviago" }
  ],

  expertise: [
    {
      title: "Arquitetura de Produto",
      description: "Design de sistemas escaláveis focados em objetivos de negócio, garantindo que a tecnologia impulsione o crescimento sem criar dívida técnica.",
      iconName: "Layout"
    },
    {
      title: "Dados & IA",
      description: "Especialista em criar ecossistemas de informação que alimentam a inteligência de negócio, transformando volume de dados em clareza estratégica.",
      iconName: "Database"
    },
    {
      title: "Celeridade Operacional",
      description: "Otimização técnica de processos para garantir que o software entregue agilidade real ao fluxo de trabalho.",
      iconName: "Zap"
    }
  ],

  projects: [
    {
      id: "nexus-dash",
      title: "NEXUS DASH",
      tagline: "Intelligent Data Analytics Platform",
      shortDescription: "Plataforma Full-Stack de análise de dados automatizada com IA Generativa para transformar planilhas em insights acionáveis.",
      fullDescription: "O NEXUS DASH é uma solução avançada que automatiza a análise de dados complexos. Através de um motor de processamento robusto, a plataforma realiza limpeza automática, detecção de tipos e gera visualizações interativas instantaneamente. O diferencial reside na NEXUS AI, que utiliza o modelo Llama-3.1 para permitir que usuários 'conversem' com seus dados em linguagem natural.",
      technicalArchitecture: [
        "Motor de Processamento (Pandas/NumPy): Limpeza e tratamento de dados em tempo real",
        "Dashboard Interativo (Recharts): Visualizações reativas com filtros globais",
        "NEXUS AI (Llama-3.1/Groq): Chatbot contextual com injeção de Markdown estatístico",
        "DevSecOps: Isolamento de credenciais e processamento estritamente em RAM"
      ],
      challenges: "Garantir a precisão das respostas da IA mitigando alucinações através da alimentação de um contexto estatístico preciso extraído dos dados brutos.",
      securityMeasures: [
        "Zero chaves hardcoded",
        "Privacidade de Dados: Processamento em RAM",
        "Sanitização de Input e proteção de Headers"
      ],
      techStack: ["React", "TypeScript", "FastAPI", "Pandas", "Python", "Llama-3.1", "Groq API"],
      imageUrl: nexusDashImg,
      liveUrl: "https://nexusdash-zeta.vercel.app"
    }
  ],

  skills: [
    {
      category: "Arquitetura",
      items: ["Product Architecture", "Lógica de Programação", "Estruturação de Produtos"]
    },
    {
      category: "IA & Dados",
      items: ["Sistemas Evolutivos", "Generative AI", "Pandas & NumPy"]
    },
    {
      category: "Operacional",
      items: ["Celeridade Operacional", "Visão Estratégica", "Process Management", "DevOps"]
    }
  ]
};

export const getIcon = (name: string) => {
  const icons = { Layout, Database, Zap, Cpu, Code2, Globe, Mail };
  return icons[name as keyof typeof icons] || Code2;
};
