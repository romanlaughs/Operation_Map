using MongoDB.Bson;
using MongoDB.Driver;

namespace Operation_Map.Server.Controllers
{
    public class MongoDBService
    {
        private readonly IMongoDatabase _database;


        public MongoDBService(string connectionString, string dbName)
        {
            var settings = MongoClientSettings.FromConnectionString(connectionString);
            settings.ServerApi = new ServerApi(ServerApiVersion.V1);
            var client = new MongoClient(settings);
            _database = client.GetDatabase(dbName);
        }

/*        private void PingDatabase()
        {
            try
            {
                var result = _database.RunCommand<BsonDocument>(new BsonDocument("ping", 1));
                Console.WriteLine("Pinged your deployment. You successfully connected to MongoDB!");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Failed to ping MongoDB: " + ex.Message);
                throw; // Re-throw the exception if you want to halt the application start-up.
            }
        }*/

        public IMongoCollection<T> GetCollection<T>(string collectionName)
        {
            return _database.GetCollection<T>(collectionName);
        }
    }

}
