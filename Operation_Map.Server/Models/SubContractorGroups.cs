using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace Operation_Map.Server.Models
{
    public class SubcontractorGroup
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? _id { get; set; }

        public string? GroupName { get; set; }

        public List<string>? SubcontractorIds { get; set; }  // List of subcontractor IDs in the group

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;  // Default to the current time

        public DateTime UpdatedDate { get; set; } = DateTime.UtcNow;  // Default to the current time
        public string GroupCity { get; internal set; }
        public string GroupType { get; internal set; }
    }
}
