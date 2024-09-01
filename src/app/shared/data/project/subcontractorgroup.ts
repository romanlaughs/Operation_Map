import { Subcontractor } from './subcontractors';
export interface SubcontractorGroup {
  _id: string;
  groupName: string;
  groupCity: string;
  groupType: string;
  subcontractorIds?: string[];
  createdDate?: Date;
  updatedDate?: Date;
}
