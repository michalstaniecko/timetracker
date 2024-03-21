export interface Track {
  id: string;
  endTime: number;
  description?: string;
  projectId: string;
  startTime: number;
  userId: string | undefined;
  created: number;
  taskId?: string;
}

export interface Filters {
  projectId: string;
  dateFrom: number;
  dateTo: number;
}
