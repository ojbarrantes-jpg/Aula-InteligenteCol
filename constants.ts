import { PromptSection, PromptExample } from './types';

export const FORM_CONFIG: Record<PromptSection, PromptExample> = {
  [PromptSection.Context]: {
    label: "1. Contexto (¿Cuál es la situación?)",
    placeholder: "Ejemplo: Estoy enseñando el ciclo del agua a estudiantes de 3er grado de primaria que tienen dificultades para entender la evaporación.",
    description: "Describe el entorno, el público objetivo y los antecedentes necesarios.",
  },
  [PromptSection.Action]: {
    label: "2. Acción (¿Qué quieres que haga?)",
    placeholder: "Ejemplo: Crea una analogía sencilla y una actividad práctica de 10 minutos que pueda realizar en el aula.",
    description: "Define claramente la tarea o el objetivo específico que debe cumplir la IA.",
  },
  [PromptSection.Role]: {
    label: "3. Rol (¿Quién debe ser la IA?)",
    placeholder: "Ejemplo: Actúa como un experto en pedagogía infantil con especialización en ciencias naturales y método Montessori.",
    description: "Asigna una personalidad o experiencia específica para guiar el tono y la calidad.",
  },
  [PromptSection.Style]: {
    label: "4. Estilo (Tono, formato, longitud)",
    placeholder: "Ejemplo: Tono entusiasta y motivador. Formato de lista paso a paso. Máximo 200 palabras.",
    description: "Especifica cómo quieres recibir la respuesta (tablas, listas, código, tono formal/informal).",
  },
};

export const INITIAL_STATE = {
  context: '',
  action: '',
  role: '',
  style: '',
};