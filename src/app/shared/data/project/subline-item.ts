export interface SubLineItem {
  id: string;
  lineItemName: string;
  budget: number;
  additionalCost?: number | null;
  subcontractorCost?: number | null;
  notes?: string;
  selected?: boolean;
  lineItemRef?: string;
  editMode?: boolean;
}
