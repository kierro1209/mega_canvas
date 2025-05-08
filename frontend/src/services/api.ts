import { Assignment } from "@/types";

const API_BASE_URL = "http://localhost:8000";

export const fetchAssignments = async (hashedStudentId: string): Promise<Assignment[]> => {
  const response = await fetch(`${API_BASE_URL}/todo_short?hashed_stu_id=${hashedStudentId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch assignments');
  }
  return response.json();
};

export const fetchStudentDashboard = async (hashedStudentId: string) => {
  const response = await fetch(`${API_BASE_URL}/student_dashboard?hashed_stu_id=${hashedStudentId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch student dashboard');
  }
  return response.json();
};

export const fetchClassResources = async (classId: string) => {
  const response = await fetch(`${API_BASE_URL}/class?class_id=${classId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch class resources');
  }
  return response.json();
}; 