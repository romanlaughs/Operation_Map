using System.Collections.Generic;
using System.Threading.Tasks;
using Operation_Map.Server.Models;

namespace Operation_Map.Server.Helpers
{
    public interface IMaterialRepository
    {
        Task<List<Material>> GetMaterialsAsync();
        Task<Material?> GetMaterialByIdAsync(string id);
        Task CreateMaterialAsync(Material material);
        Task UpdateMaterialAsync(Material material);
        Task DeleteMaterialAsync(string id);
        Task<List<Material>> GetMaterialsByProjectIdAsync(string projectId);
    }
}
