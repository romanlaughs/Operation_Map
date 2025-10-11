export interface AccountingMaterial {
  id: string;
  materialType?: string;
  supplierOrStore?: string;
  itemNumber?: string;
  datePurchased?: Date;
  price?: number;
  additionalOrder?: number;
  payments?: Payment[];
}

export interface Payment {
  id: string;
  description?: string;
  amount?: number;
  datePaid?: Date;
  invoiceURL?: string;
}
