using System.Collections.Generic;
using System.Threading.Tasks;
using Operation_Map.Server.Models;

namespace Operation_Map.Server.Helpers
{
    public interface ISubcontractorGroupRepository
    {
        Task<List<SubcontractorGroup>> GetSubcontractorGroupsAsync(string email);
        Task<SubcontractorGroup?> GetSubcontractorGroupByIdAsync(string email, string groupId);
        Task CreateSubcontractorGroupAsync(string email, SubcontractorGroup subcontractorGroup);
        Task UpdateSubcontractorGroupAsync(string email, SubcontractorGroup subcontractorGroup);
        Task DeleteSubcontractorGroupAsync(string email, string groupId);
        Task RemoveMemberFromSubcontractorGroupAsync(string userEmail, string groupId, string subcontractorId);
    }
}
