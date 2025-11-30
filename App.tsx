import React from 'react';
import { Header } from './components/Header';
import { PromptBuilder } from './components/PromptBuilder';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Header />
      
      <main className="flex-grow py-8 px-4">
        <PromptBuilder />
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-6 mt-8">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Aula InteligenteCol. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Potenciado por tecnología Google Gemini
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;