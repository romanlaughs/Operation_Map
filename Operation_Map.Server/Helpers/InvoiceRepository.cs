using MongoDB.Driver;
using Operation_Map.Server.Models;
using Operation_Map.Server.Controllers;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Operation_Map.Server.Helpers
{
    public class InvoiceRepository : IInvoiceRepository
    {
        private readonly IMongoCollection<User> _usersCollection;

        public InvoiceRepository(MongoDBService mongoDBService)
        {
            _usersCollection = mongoDBService.GetCollection<User>("Users");
        }

        public async Task<List<Invoice>> GetInvoicesAsync(string userEmail, string projectId, string lineItemId)
        {
            var user = await _usersCollection.Find(u => u.Email == userEmail).FirstOrDefaultAsync();
            var project = user?.Projects?.FirstOrDefault(p => p._id == projectId);
            var lineItem = project?.LineItems?.FirstOrDefault(li => li.Id == lineItemId);
            return lineItem?.Invoices ?? new List<Invoice>();
        }

        public async Task<Invoice> GetInvoiceByIdAsync(string userEmail, string projectId, string lineItemId, string invoiceId)
        {
            var user = await _usersCollection.Find(u => u.Email == userEmail).FirstOrDefaultAsync();
            var project = user?.Projects?.FirstOrDefault(p => p._id == projectId);
            var lineItem = project?.LineItems?.FirstOrDefault(li => li.Id == lineItemId);
            return lineItem?.Invoices?.FirstOrDefault(inv => inv.Id == invoiceId);
        }

        public async Task CreateInvoiceAsync(string userEmail, string projectId, string lineItemId, Invoice invoice)
        {
            var user = await _usersCollection.Find(u => u.Email == userEmail).FirstOrDefaultAsync();
            var project = user?.Projects?.FirstOrDefault(p => p._id == projectId);
            var lineItem = project?.LineItems?.FirstOrDefault(li => li.Id == lineItemId);

            if (lineItem != null)
            {
                invoice.Id = MongoDB.Bson.ObjectId.GenerateNewId().ToString();
                lineItem.Invoices = lineItem.Invoices ?? new List<Invoice>();
                lineItem.Invoices.Add(invoice);

                await _usersCollection.ReplaceOneAsync(u => u.Id == user.Id, user);
            }
        }

        public async Task UpdateInvoiceAsync(string userEmail, string projectId, string lineItemId, string invoiceId, Invoice invoice)
        {
            var user = await _usersCollection.Find(u => u.Email == userEmail).FirstOrDefaultAsync();
            var project = user?.Projects?.FirstOrDefault(p => p._id == projectId);
            var lineItem = project?.LineItems?.FirstOrDefault(li => li.Id == lineItemId);

            if (lineItem != null)
            {
                var existingInvoice = lineItem.Invoices?.FirstOrDefault(inv => inv.Id == invoiceId);
                if (existingInvoice != null)
                {
                    existingInvoice.SubcontractorName = invoice.SubcontractorName;
                    existingInvoice.InvoiceDate = invoice.InvoiceDate;
                    existingInvoice.InvoiceAmount = invoice.InvoiceAmount;
                    existingInvoice.Notes = invoice.Notes;
                    existingInvoice.PdfUrl = invoice.PdfUrl;

                    await _usersCollection.ReplaceOneAsync(u => u.Id == user.Id, user);
                }
            }
        }

        public async Task DeleteInvoiceAsync(string userEmail, string projectId, string lineItemId, string invoiceId)
        {
            var user = await _usersCollection.Find(u => u.Email == userEmail).FirstOrDefaultAsync();
            var project = user?.Projects?.FirstOrDefault(p => p._id == projectId);
            var lineItem = project?.LineItems?.FirstOrDefault(li => li.Id == lineItemId);

            if (lineItem != null)
            {
                lineItem.Invoices = lineItem.Invoices?.Where(inv => inv.Id != invoiceId).ToList();
                await _usersCollection.ReplaceOneAsync(u => u.Id == user.Id, user);
            }
        }
    }
}
