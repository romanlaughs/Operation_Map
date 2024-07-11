export interface Material {
  id: string;
  nameDescription: string;
  datePurchased: Date;
  placePurchased?: string;
  notes?: string;
  itemNumber?: string;
  photoUploadUrl?: string;
  projectIds: string;
}
