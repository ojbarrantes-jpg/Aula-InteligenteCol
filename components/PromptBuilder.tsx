import React, { useState, useCallback } from 'react';
import { Copy, RefreshCw, Wand2, Eraser, Play, Loader2 } from 'lucide-react';
import { CareState, PromptSection } from '../types';
import { FORM_CONFIG, INITIAL_STATE } from '../constants';
import { generateAIResponse } from '../services/geminiService';

export const PromptBuilder: React.FC = () => {
  const [inputs, setInputs] = useState<CareState>(INITIAL_STATE);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleInputChange = (section: PromptSection, value: string) => {
    setInputs(prev => ({ ...prev, [section]: value }));
  };

  const handleClear = () => {
    setInputs(INITIAL_STATE);
    setGeneratedPrompt('');
    setAiResponse('');
  };

  const constructPrompt = useCallback(() => {
    const parts = [
      inputs.context ? `CONTEXTO: ${inputs.context}` : '',
      inputs.role ? `ROL: ${inputs.role}` : '',
      inputs.action ? `ACCIÓN: ${inputs.action}` : '',
      inputs.style ? `ESTILO: ${inputs.style}` : ''
    ].filter(Boolean);

    if (parts.length === 0) return '';
    
    return parts.join('\n\n');
  }, [inputs]);

  const handleGenerate = () => {
    const prompt = constructPrompt();
    setGeneratedPrompt(prompt);
  };

  const handleCopy = async () => {
    if (!generatedPrompt) return;
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleTestWithAI = async () => {
    const prompt = constructPrompt();
    if (!prompt) return;
    
    // Ensure the display is updated
    setGeneratedPrompt(prompt);
    
    setIsLoading(true);
    setAiResponse('');
    
    try {
      const response = await generateAIResponse(prompt);
      setAiResponse(response);
    } catch (error) {
        if(error instanceof Error) {
             setAiResponse(`Error: ${error.message}`);
        } else {
             setAiResponse('Ocurrió un error inesperado.');
        }
     
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-8">
      
      {/* Title Section */}
      <div className="bg-white rounded-xl shadow-sm border border-brand-blue/10 p-6">
        <h2 className="text-xl md:text-2xl font-bold text-brand-orange mb-2 flex items-center gap-2">
          <Wand2 className="w-6 h-6" />
          Generador de Prompts (Framework CARE)
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Completa los campos a continuación para crear un prompt educativo estructurado y efectivo para tus clases.
        </p>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-xl shadow-sm border border-brand-blue/10 p-6 space-y-5">
        
        {(Object.keys(FORM_CONFIG) as PromptSection[]).map((key) => (
          <div key={key} className="space-y-2">
            <label className="block text-sm font-semibold text-brand-blue">
              {FORM_CONFIG[key].label}
            </label>
            <textarea
              value={inputs[key]}
              onChange={(e) => handleInputChange(key, e.target.value)}
              placeholder={FORM_CONFIG[key].placeholder}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition-all text-sm min-h-[80px] resize-y placeholder:text-gray-400"
            />
            <p className="text-xs text-gray-500 italic">
              {FORM_CONFIG[key].description}
            </p>
          </div>
        ))}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
          <button
            onClick={handleGenerate}
            className="flex-1 bg-brand-orange hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <RefreshCw className="w-5 h-5" />
            Generar Prompt
          </button>
          
          <button
            onClick={handleTestWithAI}
            disabled={isLoading}
            className="flex-1 bg-brand-blue hover:bg-blue-900 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-70"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
            Probar con IA
          </button>

          <button
            onClick={handleClear}
            className="sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Eraser className="w-5 h-5" />
            Limpiar
          </button>
        </div>
      </div>

      {/* Output Section */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Prompt Output */}
        <div className="bg-white rounded-xl shadow-sm border border-brand-blue/10 p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Tu Prompt Estructurado</h3>
            {generatedPrompt && (
              <button
                onClick={handleCopy}
                className={`text-xs flex items-center gap-1 px-2 py-1 rounded transition-colors ${copied ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <Copy className="w-3 h-3" />
                {copied ? '¡Copiado!' : 'Copiar'}
              </button>
            )}
          </div>
          <div className="flex-grow bg-gray-50 rounded-lg p-4 border border-gray-200">
             {generatedPrompt ? (
               <p className="whitespace-pre-wrap text-sm text-gray-700 font-mono leading-relaxed">
                 {generatedPrompt}
               </p>
             ) : (
               <p className="text-gray-400 text-sm italic text-center mt-8">
                 El prompt generado aparecerá aquí...
               </p>
             )}
          </div>
        </div>

        {/* AI Result Output */}
        <div className="bg-white rounded-xl shadow-sm border border-brand-blue/10 p-6 flex flex-col h-full">
           <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <span className="bg-brand-cyan text-white text-[10px] font-bold px-1.5 py-0.5 rounded">GEMINI</span>
              Resultado de la IA
            </h3>
          </div>
          <div className="flex-grow bg-slate-50 rounded-lg p-4 border border-gray-200 overflow-y-auto max-h-[400px]">
             {isLoading ? (
               <div className="flex flex-col items-center justify-center h-40 gap-3">
                 <Loader2 className="w-8 h-8 text-brand-cyan animate-spin" />
                 <p className="text-sm text-gray-500">Consultando a Gemini...</p>
               </div>
             ) : aiResponse ? (
               <div className="prose prose-sm prose-slate max-w-none">
                 {/* Simple formatting for lines */}
                 {aiResponse.split('\n').map((line, i) => (
                   <p key={i} className="mb-2 last:mb-0">{line}</p>
                 ))}
               </div>
             ) : (
               <p className="text-gray-400 text-sm italic text-center mt-8">
                 Haz clic en "Probar con IA" para ver un ejemplo del resultado.
               </p>
             )}
          </div>
        </div>

      </div>
    </div>
  );
};