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
        public int? MaterialCost { get; set; }
        public int? TotalCost { get; set; }
        public bool? SelectedBid { get; set; }
        public string? Notes { get; set; }
        public DateTime? DateStarted { get; set; }
        public DateTime? DateFinished { get; set; }
        public List<string>? PaidInvoices { get; set; }
    }

}