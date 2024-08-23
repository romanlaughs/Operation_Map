import { Subcontractor } from './subcontractor.model'
export interface SubcontractorGroup {
  _id: string;
  groupName: string;
  groupCity: string;
  groupType: string;
  subcontractorIds?: string[];
  createdDate?: Date;
  updatedDate?: Date;
}
