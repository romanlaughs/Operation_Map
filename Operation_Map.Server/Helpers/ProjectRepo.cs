using MongoDB.Driver;
using Operation_Map.Server.Controllers;
using Operation_Map.Server.Models;
using Operation_Map.Server.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using Azure.Storage.Blobs;
using Microsoft.Extensions.Configuration;

namespace Operation_Map.Server.Helpers
{

    public class ProjectRepository : IProjectRepository
    {
        private readonly IMongoCollection<Project> _projectsCollection;

        public ProjectRepository(MongoDBService mongoDBService)
        {
            _projectsCollection = mongoDBService.GetCollection<Project>("Projects");
        }

        public async Task<List<Project>> GetProjectsAsync()
        {
            return await _projectsCollection.Find(project => true).ToListAsync();
        }

        public async Task<Project?> GetProjectByIdAsync(string id)
        {
            return await _projectsCollection.Find(project => project._id == id).FirstOrDefaultAsync();
        }

        public async Task CreateProjectAsync(Project project)
        {
            await _projectsCollection.InsertOneAsync(project);
        }

        public async Task UpdateProjectAsync(Project project)
        {
            await _projectsCollection.ReplaceOneAsync(p => p._id == project._id, project);
        }

        public async Task DeleteProjectAsync(string id)
        {
            await _projectsCollection.DeleteOneAsync(project => project._id == id);
        }
    }
}
