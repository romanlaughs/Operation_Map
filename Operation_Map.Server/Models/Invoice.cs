using System;

namespace Operation_Map.Server.Models
{
    public class Invoice
    {
        public string? Id { get; set; }
        public string? SubcontractorName { get; set; }
        public DateTime? InvoiceDate { get; set; }
        public decimal? InvoiceAmount { get; set; }
        public string? Notes { get; set; }
        public string? PdfUrl { get; set; } // Optional URL for the uploaded PDF
    }
}
