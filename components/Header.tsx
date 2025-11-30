import React from 'react';
import { GraduationCap, Cpu } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo Representation based on user description */}
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 flex items-center justify-center">
            {/* Abstract House/Chip Logo Concept */}
            <div className="absolute inset-0 bg-brand-blue rounded-lg transform rotate-3 opacity-10"></div>
            <div className="relative z-10 text-brand-blue">
               <div className="flex flex-col items-center">
                 <GraduationCap size={32} strokeWidth={2} />
                 <Cpu size={16} className="text-brand-cyan -mt-2 bg-white rounded-full border border-white" />
               </div>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-brand-blue tracking-tight leading-none">
              Aula Inteligente<span className="text-brand-cyan">Col</span>
            </h1>
            <span className="text-xs text-gray-500 font-medium tracking-wide">
              INNOVACIÓN EDUCATIVA
            </span>
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <a 
            href="https://aulainteligentecol.wixsite.com/aula-inteligentecol" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-medium text-brand-blue hover:text-brand-cyan transition-colors"
          >
            Visitar Sitio Web
          </a>
        </nav>
      </div>
    </header>
  );
};