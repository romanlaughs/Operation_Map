import { Subcontractor } from './subcontractor.model'
export interface SubcontractorGroup {
  id: string;
  GroupName?: string;
  Subcontractors?: Subcontractor[];
  CreatedDate?: Date;
  UpdatedDate?: Date;
}
