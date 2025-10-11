using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace Operation_Map.Server.Models
{
    public class SupplierGroup
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? _id { get; set; }

        public string? GroupName { get; set; }

        public List<string>? SupplierIds { get; set; }  // List of supplier IDs in the group

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;  // Default to the current time

        public DateTime UpdatedDate { get; set; } = DateTime.UtcNow;  // Default to the current time
    }
}
