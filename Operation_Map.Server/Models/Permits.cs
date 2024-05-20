using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;


namespace Operation_Map.Server.Models
{
    public class Permits
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public Permit? LandUse { get; set; }
        public Permit? Building { get; set; }
        public Permit? Electrical { get; set; }
        public Permit? Plumbing { get; set; }
        public Permit? HVAC { get; set; }
        public Permit? FireSprinklerSystem { get; set; }
        public Permit? RightOfWay { get; set; }
        public Permit? SideSewer { get; set; }
        public Permit? Driveway { get; set; }

        [BsonExtraElements]
        public Dictionary<string, Permit>? CustomFields { get; set; }

    }

}