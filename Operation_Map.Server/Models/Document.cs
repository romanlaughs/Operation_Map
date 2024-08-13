using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;


namespace Operation_Map.Server.Models
{
    public class Document
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? DocumentName { get; set; }
        public DateTime? DateUploaded { get; set; }
        public string? PDFUploadURL { get; set; }
        public string? Notes { get; set; }
    }

}