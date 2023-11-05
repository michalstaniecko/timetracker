import type { Timestamp } from 'firebase/firestore';

export interface TrackingTime {
  id: string;
  start: number;
  end: number;
  created: number;
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  created: Timestamp;
  tracingHistory?: TrackingTime[];
  teamId: string;
  summary: number;
}

export type Projects = Project[];

export interface State {
  projects: Projects;
}

export type Filters = any;
