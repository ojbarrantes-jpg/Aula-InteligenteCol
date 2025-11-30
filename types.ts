export interface CareState {
  context: string;
  action: string;
  role: string;
  style: string;
}

export enum PromptSection {
  Context = 'context',
  Action = 'action',
  Role = 'role',
  Style = 'style',
}

export interface PromptExample {
  label: string;
  placeholder: string;
  description: string;
}