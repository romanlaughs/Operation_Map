using MongoDB.Driver;
using Operation_Map.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Operation_Map.Server.Controllers;
using Operation_Map.Server.Helpers;

namespace Operation_Map.Server.Helpers
{
    public class MaterialRepository : IMaterialRepository
    {
        private readonly IMongoCollection<Material> _materialsCollection;

        public MaterialRepository(MongoDBService mongoDBService)
        {
            _materialsCollection = mongoDBService.GetCollection<Material>("Materials");
        }

        public async Task<List<Material>> GetMaterialsAsync()
        {
            return await _materialsCollection.Find(material => true).ToListAsync();
        }

        public async Task<List<Material>> GetMaterialsByProjectIdAsync(string projectId)
        {
            return await _materialsCollection.Find(material => material.ProjectIDs.Contains(projectId)).ToListAsync();
        }

        public async Task<Material?> GetMaterialByIdAsync(string id)
        {
            return await _materialsCollection.Find(material => material.Id == id).FirstOrDefaultAsync();
        }

        public async Task CreateMaterialAsync(Material material)
        {
            await _materialsCollection.InsertOneAsync(material);
        }

        public async Task UpdateMaterialAsync(Material material)
        {
            await _materialsCollection.ReplaceOneAsync(m => m.Id == material.Id, material);
        }

        public async Task DeleteMaterialAsync(string id)
        {
            await _materialsCollection.DeleteOneAsync(material => material.Id == id);
        }
    }
}
