using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Operation_Map.Server.Models
{
    public class SubProject
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? ProjectId { get; set; }
        public string? LineItemId { get; set; }
        public string? LineItemName { get; set; }
        public DateTime PaidDate { get; set; }
        public DateTime StartDate { get; set; }
        public bool? Started { get; set; }
        public bool? Finished { get; set; }
        public DateTime FinishDate { get; set; }
        public decimal? BidPrice { get; set; }
        public decimal? PaidSoFar { get; set; }
        public decimal? LeftToPay { get; set; }
    }
}
