export interface Subcontractor {
  id: string;
  contactName?: string;
  companyName?: string;
  companyType?: string;
  percentagePaid?: number;
  pdfUpload?: string;  // URL to the uploaded PDF
  address?: string;
  bids?: number;
  contactPhoneNumber?: string;
  website?: string;
  contactEmail?: string;
  subProjects?: [];
  ubi?: string;  // Unified Business Identifier
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
}

export interface Bid {
  // Define properties of Bid based on your requirements
}
