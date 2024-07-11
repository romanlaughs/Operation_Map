import { Subcontractor } from './subcontractor.model';

export interface LineItem {
  id?: string;
  lineItemName?: string;
  numberBids?: number;
  budget?: number;
  subcontractors?: Subcontractor[];
  subcontractorCost?: number;
  materialCost?: number;
  totalCost?: number;
  selectedBid?: boolean;
  notes?: string;
  dateStarted?: Date;
  dateFinished?: Date;
  paidInvoices?: string[];
}
