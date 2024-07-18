using Microsoft.AspNetCore.Mvc;
using Operation_Map.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Operation_Map.Server.Helpers
{
    public interface ILineItemRepository
    {
        Task<List<LineItem>> GetLineItemsAsync(string userEmail, string projectId);
        Task<LineItem?> GetLineItemByIdAsync(string userEmail, string projectId, string lineItemId);
        Task CreateLineItemAsync(string userEmail, string projectId, LineItem lineItem);
        Task UpdateLineItemAsync(string userEmail, string projectId, LineItem lineItem);
        Task UpdateLineItemSubsAsync(string userEmail, string projectId, LineItem updatedLineItem, Subcontractor updatedSubcontractor);
        Task DeleteLineItemAsync(string userEmail, string projectId, string lineItemId);
        Task DeleteLineItemSubAsync(string userEmail, string projectId, string lineItemId, Subcontractor subcontractor);
    }
}
