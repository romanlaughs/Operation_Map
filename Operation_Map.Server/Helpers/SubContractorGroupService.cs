using MongoDB.Driver;
using Operation_Map.Server.Controllers;
using Operation_Map.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

public class SubcontractorGroupService
{
    private readonly IMongoCollection<User> _users;

    public SubcontractorGroupService(MongoDBService mongoDBService)
    {
        _users = mongoDBService.GetCollection<User>("Users");
    }

    public async Task AddSubcontractorsToGroup(string email, string groupName, string groupCity, string groupType, List<string> subcontractorIds)
    {
        var filter = Builders<User>.Filter.Eq(u => u.Email, email);
        var updateInitialize = Builders<User>.Update
            .SetOnInsert(u => u.SubcontractorGroups, new List<SubcontractorGroup>());

        await _users.UpdateOneAsync(filter, updateInitialize);

        var updateAddToSet = Builders<User>.Update
            .AddToSet(u => u.SubcontractorGroups, new SubcontractorGroup
            {
                GroupName = groupName,
                GroupCity = groupCity,
                GroupType = groupType,
                SubcontractorIds = subcontractorIds,
                CreatedDate = DateTime.UtcNow,
                UpdatedDate = DateTime.UtcNow
            });

        await _users.UpdateOneAsync(filter, updateAddToSet);
    }

    public async Task<List<SubcontractorGroup>> GetSubcontractorGroupsAsync(string email)
    {
        var filter = Builders<User>.Filter.Eq(u => u.Email, email);
        var user = await _users.Find(filter).FirstOrDefaultAsync();
        return user?.SubcontractorGroups ?? new List<SubcontractorGroup>();
    }
}
