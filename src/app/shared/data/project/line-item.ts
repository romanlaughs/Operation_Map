import { Subcontractor } from './subcontractors';

export interface LineItem {
  id?: string;
  lineItemName?: string;
  numberBids?: number;
  budget?: number;
  subcontractors?: Subcontractor[];
  subcontractorCost?: number;
  notes?: string;
  bidSelected?: boolean;
  invoices?: [];
}
