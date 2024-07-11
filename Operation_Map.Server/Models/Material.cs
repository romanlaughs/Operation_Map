using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;


namespace Operation_Map.Server.Models
{
    public class Material
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? NameDescription { get; set; }
        public DateTime? DatePurchased { get; set; }
        public string? PlacePurchased { get; set; }
        public string? Notes { get; set; }
        public string? ItemNumber { get; set; }
        public string? PhotoUploadUrl { get; set; }
        public List<string>? ProjectIDs { get; set; }
    }

}