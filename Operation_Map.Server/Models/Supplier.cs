using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Operation_Map.Server.Models
{
    public class Supplier
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? CompanyName { get; set; }
        public string? SalespersonName { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }
    }
}
