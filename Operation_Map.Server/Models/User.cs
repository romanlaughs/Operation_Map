using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;


namespace Operation_Map.Server.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public List<Project>? Projects { get; set; }
        public List<Subcontractor> Subcontractors { get; set; } = new List<Subcontractor>();
        public List<SubcontractorGroup>? SubcontractorGroups { get; set; }
    }


}
