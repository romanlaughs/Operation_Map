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
        public int? NumberBids { get; set; }
        public int? Budget { get; set; }
        public List<Subcontractor>? Subcontractors { get; set; }
        public int? SubcontractorCost { get; set; }
        public string? Notes { get; set; }
        public Boolean? BidSelected { get; set; }
        public List<Invoice>? Invoices { get; set; }

    }

}