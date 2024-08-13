using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Operation_Map.Server.Controllers;
using Operation_Map.Server.Models;
using Operation_Map.Server.Services;

namespace Operation_Map.Server.Helpers
{
    public interface IUserRepository
    {
        Task<User?> GetUserByEmailAsync(string email);
        Task CreateUserAsync(User user);
        Task UpdateUserAsync(User user);
        Task DeleteUserAsync(string id);
    }

    public class UserRepository : IUserRepository
    {
        private readonly IMongoCollection<User> _usersCollection;

        public UserRepository(MongoDBService mongoDBService)
        {
            _usersCollection = mongoDBService.GetCollection<User>("Users");
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _usersCollection.Find(user => user.Email == email).FirstOrDefaultAsync();
        }

        public async Task CreateUserAsync(User user)
        {
            await _usersCollection.InsertOneAsync(user);
        }

        public async Task UpdateUserAsync(User user)
        {
            await _usersCollection.ReplaceOneAsync(u => u.Email == user.Email, user);
        }

        public async Task DeleteUserAsync(string email)
        {
            await _usersCollection.DeleteOneAsync(user => user.Email == email);
        }
    }
}
