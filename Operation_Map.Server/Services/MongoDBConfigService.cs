using MongoDB.Bson.Serialization;
using Operation_Map.Server.Models;

namespace Operation_Map.Server.Services
{
    public class MongoDBConfigService
    {
        public static void RegisterClassMaps()
        {
            BsonClassMap.RegisterClassMap<User>(cm =>
            {
                cm.AutoMap();
                cm.MapMember(c => c.Id).SetElementName("_id");
            });

            BsonClassMap.RegisterClassMap<Project>(cm =>
            {
                cm.AutoMap();
                cm.MapMember(c => c.Id).SetElementName("_id");
            });

            BsonClassMap.RegisterClassMap<Bid>(cm =>
            {
                cm.AutoMap();
                cm.MapMember(c => c.Id).SetElementName("_id");
            });

            BsonClassMap.RegisterClassMap<Subcontractor>(cm =>
            {
                cm.AutoMap();
                cm.MapMember(c => c.Id).SetElementName("_id");
            });
        }
    }
}
