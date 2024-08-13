using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Text.RegularExpressions;


namespace Operation_Map.Server.Models
{
    public class Subcontractor
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? ContactName { get; set; }
        public string? CompanyName { get; set; }
        public string? CompanyType { get; set; }
        public double? PercentagePaid { get; set; }
        public string? PdfUpload { get; set; }  // URL to the uploaded PDF
        public string? Address { get; set; }
        public List<SubProject>? Projects { get; set; }
        public string? ContactPhoneNumber { get; set; }
        public string? Website { get; set; }
        public string? ContactEmail { get; set; }
        public string? Ubi { get; set; }  // Unified Business Identifier
        public string? License { get; set; }
        public string? TaxId { get; set; }
        public string? Other {  get; set; }
        public string? InsuranceCompany { get; set; }
        public string? InsuranceAgent { get; set; }
        public string? InsurancePhone { get; set; }
        public string? InsuranceEmail { get; set; }
        public bool? AdditionalInsured { get; set; }
        public string? CertificatePDFURL { get; set; }
        public string? AdditionalInsurancePDFURL { get; set; }
    }

}