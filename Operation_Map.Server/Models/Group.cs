using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;


namespace Operation_Map.Server.Models
{
    public class Group
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? GroupName { get; set; }
        public string? GroupCity { get; set; }
        public string? GroupType { get; set;}
    }

}