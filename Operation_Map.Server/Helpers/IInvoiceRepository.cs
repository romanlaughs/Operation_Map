using Operation_Map.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Operation_Map.Server.Helpers
{
    public interface IInvoiceRepository
    {
        Task<List<Invoice>> GetInvoicesAsync(string userEmail, string projectId, string lineItemId);
        Task<Invoice> GetInvoiceByIdAsync(string userEmail, string projectId, string lineItemId, string invoiceId);
        Task CreateInvoiceAsync(string userEmail, string projectId, string lineItemId, Invoice invoice);
        Task UpdateInvoiceAsync(string userEmail, string projectId, string lineItemId, string invoiceId, Invoice invoice);
        Task DeleteInvoiceAsync(string userEmail, string projectId, string lineItemId, string invoiceId);
    }
}
