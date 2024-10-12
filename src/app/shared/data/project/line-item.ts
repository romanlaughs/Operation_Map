import { Subcontractor } from './subcontractors';
import { SubLineItem } from './subline-item';

export interface LineItem {
  id?: string | null;
  lineItemName?: string;
  numberBids?: number;
  budget: number;
  subcontractors?: Subcontractor[];
  subcontractorCost?: number | null;
  notes?: string;
  bidSelected?: boolean;
  invoices?: [];
  selected: boolean;
  showAdditionalFields?: boolean;
  editMode?: boolean;
  subItems?: LineItem[];
  subLineItem: boolean;
  lineItemRef: string;
  subLineItems?: SubLineItem[];
}
