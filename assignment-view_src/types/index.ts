
export type Assignment = {
  id: string;
  name: string;
  status: 'SUBMITTED' | 'OVERDUE' | 'NO SUBMISSION';
  dueDate: string;
  tags: string[];
};

export type StatusCount = {
  submitted: number;
  comingUp: number;
  overdue: number;
};
