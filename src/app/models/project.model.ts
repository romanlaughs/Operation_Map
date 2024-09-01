import { LineItemOption } from './line-item-option.model';

export interface Project {
  id: string;
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
  projectStatus: number;
  bathrooms?: number;
  squareFootage?: number;
  bedrooms?: number;
  contacts?: Contact[];
}

export interface Contact {
  name: string;
  number: string;
  email: string;
}
