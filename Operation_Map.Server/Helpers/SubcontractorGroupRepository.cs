using MongoDB.Driver;
using Operation_Map.Server.Controllers;
using Operation_Map.Server.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Operation_Map.Server.Helpers
{
    public class SubcontractorGroupRepository : ISubcontractorGroupRepository
    {
        private readonly IMongoCollection<User> _usersCollection;

        public SubcontractorGroupRepository(MongoDBService mongoDBService)
        {
            _usersCollection = mongoDBService.GetCollection<User>("Users");
        }

        public async Task<List<SubcontractorGroup>> GetSubcontractorGroupsAsync(string email)
        {
            var filter = Builders<User>.Filter.Eq(u => u.Email, email);
            var user = await _usersCollection.Find(filter).FirstOrDefaultAsync();
            return user?.SubcontractorGroups ?? new List<SubcontractorGroup>();
        }

        public async Task<SubcontractorGroup?> GetSubcontractorGroupByIdAsync(string email, string group_id)
        {
            var filter = Builders<User>.Filter.Eq(u => u.Email, email) & Builders<User>.Filter.ElemMatch(u => u.SubcontractorGroups, g => g._id == group_id);
            var user = await _usersCollection.Find(filter).FirstOrDefaultAsync();
            return user?.SubcontractorGroups?.FirstOrDefault(g => g._id == group_id);
        }

        public async Task CreateSubcontractorGroupAsync(string email, SubcontractorGroup subcontractorGroup)
        {
            var filter = Builders<User>.Filter.Eq(u => u.Email, email);

            // Initialize SubcontractorGroups if it is null
            var user = await _usersCollection.Find(filter).FirstOrDefaultAsync();
            if (user != null && user.SubcontractorGroups == null)
            {
                var updateInitialize = Builders<User>.Update
                    .Set(u => u.SubcontractorGroups, new List<SubcontractorGroup>());
                await _usersCollection.UpdateOneAsync(filter, updateInitialize);
            }

            // Add the subcontractor group
            var updateAddToSet = Builders<User>.Update
                .AddToSet(u => u.SubcontractorGroups, subcontractorGroup);

            await _usersCollection.UpdateOneAsync(filter, updateAddToSet);
        }

        public async Task UpdateSubcontractorGroupAsync(string email, SubcontractorGroup subcontractorGroup)
        {
            var filter = Builders<User>.Filter.And(
                Builders<User>.Filter.Eq(u => u.Email, email),
                Builders<User>.Filter.ElemMatch(u => u.SubcontractorGroups, g => g._id == subcontractorGroup._id)
            );
            var update = Builders<User>.Update
                .Set(u => u.SubcontractorGroups[-1], subcontractorGroup);

            await _usersCollection.UpdateOneAsync(filter, update);
        }

        public async Task DeleteSubcontractorGroupAsync(string email, string group_id)
        {
            var filter = Builders<User>.Filter.Eq(u => u.Email, email);
            var update = Builders<User>.Update
                .PullFilter(u => u.SubcontractorGroups, g => g._id == group_id);

            await _usersCollection.UpdateOneAsync(filter, update);
        }

        public async Task RemoveMemberFromSubcontractorGroupAsync(string userEmail, string groupId, string subcontractorId)
        {
            var filter = Builders<User>.Filter.Eq(u => u.Email, userEmail) &
                         Builders<User>.Filter.ElemMatch(u => u.SubcontractorGroups, g => g._id == groupId);
            var update = Builders<User>.Update.PullFilter(u => u.SubcontractorGroups[-1].SubcontractorIds, id => id == subcontractorId);
            await _usersCollection.UpdateOneAsync(filter, update);
        }
    }
}
