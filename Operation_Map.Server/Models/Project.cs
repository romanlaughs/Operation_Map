using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;


namespace Operation_Map.Server.Models
{
    public class Project
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? _id { get; set; }
        public string? Name { get; set; }
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? ZipCode { get; set; }
        public DateTime StartDate { get; set; }
        public bool? Started { get; set; }
        public bool? Finished { get; set; }
        public DateTime FinishDate { get; set; }
        public double CompletionPercentage { get; set; }
        public List<Bid>? Bids { get; set; }
        public List<Document>? Documents { get; set; }
        public int Units { get; set; }
        public List<Subcontractor>? Contacts { get; set; }
        public string? ProjectEmail { get; set; }
        public List<LineItem>? LineItems { get; set; }
        public List<Material>? Materials { get; set; }
        public int? ProjectStatus { get; set; }
        public int? Bathrooms { get; set; }
        public int? SquareFootage { get; set; }
        public int? Bedrooms { get; set; }
    }


}