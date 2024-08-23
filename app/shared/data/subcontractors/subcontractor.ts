import { Contact } from './../project/project-list';

export interface Subcontractor {
  id: string;
  contactName?: string;
  companyName?: string;
  companyType?: string;
  percentagePaid?: number;
  pdfUpload?: string; // URL to the uploaded PDF
  address?: string;
  bids?: number;
  contactPhoneNumber?: string;
  website?: string;
  contactEmail?: string;
  subProjects?: any[];
  ubi?: string; // Unified Business Identifier
  license?: string;
  taxId?: string;
  other?: string;
  insuranceCompany?: string;
  insuranceAgent?: string;
  insurancePhone?: string;
  insuranceEmail?: string;
  additionalInsured?: boolean;
  certificatePDFURL?: string;
  additionalInsurancePDFURL?: string;
  dateStarted?: Date;
  dateFinished?: Date;
  paidInvoices?: string[];
  bidDate?: Date;
  bidPrice?: number;
  paid?: number;
  leftToPay?: number;
  bidPDFUrl?: string;
  materialCost?: number;
  totalCost?: number;
  selectedBid?: boolean;
}
