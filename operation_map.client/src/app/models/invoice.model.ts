export interface Invoice {
  id: string;
  subcontractorName: string;
  invoiceDate: Date;
  invoiceAmount: number;
  notes?: string;
  pdfUrl?: string; // Optional URL for the uploaded PDF
}
