using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;


namespace Operation_Map.Server.Models
{
    public class LineItem
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? LineItemName { get; set; }
        public List<string>? Subcontractors { get; set; }
        public int? NumberBids { get; set; }
        public bool? SelectedBid { get; set; }
        public string? Notes { get; set; }
        public double? CompletionPercentage { get; set; }
        public List<string>? PaidInvoices { get; set; }
    }

}