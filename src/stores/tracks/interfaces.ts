export interface Track {
  endTime: number;
  description?: string;
  projectId: string;
  startTime: number;
  userId: string | undefined;
  created: number;
}
