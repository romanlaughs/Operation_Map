import { Subcontractor } from './subcontractor.model'
import { Project } from './project.model'

export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  projects?: Project[];
  subcontractors?: Subcontractor[];
}
