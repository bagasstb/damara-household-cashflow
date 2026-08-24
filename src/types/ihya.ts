export interface IhyaAssistance {
  id: string;
  description: string;
  amount: number;
  date: string;
  created_at: string;
}

export interface IhyaFormData {
  description: string;
  amount: number;
  date?: string;
}

export const IHYA_TOTAL = 258_339;
