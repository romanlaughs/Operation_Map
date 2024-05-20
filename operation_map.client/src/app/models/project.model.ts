export interface Project {
  id?: string;
  name: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  startDate: Date;
  started?: boolean;
  finished?: boolean;
  finishDate?: Date;
  completionPercentage: number;
  units: number;
  projectEmail?: string;
  projectStatus?: string;
  bathrooms?: number;
  squareFootage?: number;
  bedrooms?: number;
}
