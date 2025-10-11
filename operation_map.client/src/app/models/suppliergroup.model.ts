import { Supplier } from './supplier.model'

export interface SupplierGroup {
  id: string;
  GroupName?: string;
  Suppliers?: Supplier[];
  CreatedDate?: Date;
  UpdatedDate?: Date;
}
