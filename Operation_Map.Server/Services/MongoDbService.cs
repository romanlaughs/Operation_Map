using MongoDB.Driver;
using MongoDB.Bson;
using System;

namespace Operation_Map.Services
{
    // MongoDBService.cs
    using MongoDB.Driver;

    public class MongoDBService
    {
        private readonly IMongoDatabase _database;

        public MongoDBService(string connectionString, string dbName)
        {
            var client = new MongoClient(connectionString);
            _database = client.GetDatabase(dbName);
        }

        public async Task<List<T>> GetAllItemsAsync<T>(string collectionName)
        {
            var collection = _database.GetCollection<T>(collectionName);
            return await collection.Find(_ => true).ToListAsync();
        }
    }

}
