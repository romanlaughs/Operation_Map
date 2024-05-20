using System.Collections.Generic;
using System.Threading.Tasks;
using Operation_Map.Server.Models;

namespace Operation_Map.Server.Helpers
{
    public interface IProjectRepository
    {
        Task<List<Project>> GetProjectsAsync();
        Task<Project?> GetProjectByIdAsync(string id);
        Task CreateProjectAsync(Project project);
        Task UpdateProjectAsync(Project project);
        Task DeleteProjectAsync(string id);
    }
}
