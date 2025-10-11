using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace Operation_Map.Server.Models
{
    public class AccountingMaterial
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? MaterialType { get; set; }
        public string? SupplierOrStore { get; set; }
        public string? ItemNumber { get; set; }
        public DateTime? DatePurchased { get; set; }
        public double? Price { get; set; }
        public double? AdditionalOrder { get; set; }  // Similar to Additional Cost for subcontractors
        public List<Payment>? Payments { get; set; }  // For tracking multiple payments (first load, second load, etc.)
    }

    public class Payment
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? Description { get; set; }  // e.g., "First load", "Second load"
        public double? Amount { get; set; }
        public DateTime? DatePaid { get; set; }
        public string? InvoiceURL { get; set; }  // URL to uploaded invoice
    }
}
