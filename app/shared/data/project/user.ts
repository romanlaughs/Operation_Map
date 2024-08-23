import { Subcontractor } from './subcontractor';
import { Project } from './project-list';

export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  projects?: Project[];
  subcontractors?: Subcontractor[];
}
