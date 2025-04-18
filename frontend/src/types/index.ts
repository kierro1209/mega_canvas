export interface Assignment {
  id: string;
  name: string;
  status: 'SUBMITTED' | 'OVERDUE' | 'NO SUBMISSION';
  dueDate: string;
  tags: string[];
}

export interface StatusCount {
  submitted: number;
  comingUp: number;
  overdue: number;
} 