export interface ThrSpending {
  id: string;
  description: string;
  amount: number;
  date: string;
  created_at: string;
}

export interface ThrFormData {
  description: string;
  amount: number;
  date?: string;
}

export const THR_TOTAL = 16_243_994;
