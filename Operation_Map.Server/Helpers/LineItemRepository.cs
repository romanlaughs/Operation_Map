using MongoDB.Bson;
using MongoDB.Driver;
using Operation_Map.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Operation_Map.Server.Services;
using Operation_Map.Server.Controllers;

namespace Operation_Map.Server.Helpers
{
    public class LineItemRepository : ILineItemRepository
    {
        private readonly IMongoCollection<User> _usersCollection;

        public LineItemRepository(MongoDBService mongoDBService)
        {
            _usersCollection = mongoDBService.GetCollection<User>("Users");
        }

        public async Task<List<LineItem>> GetLineItemsAsync(string userEmail, string projectId)
        {
            var user = await _usersCollection.Find(u => u.Email == userEmail).FirstOrDefaultAsync();
            var project = user?.Projects?.FirstOrDefault(p => p._id == projectId);
            return project?.LineItems ?? new List<LineItem>();
        }

        public async Task<LineItem?> GetLineItemByIdAsync(string userEmail, string projectId, string lineItemId)
        {
            var user = await _usersCollection.Find(u => u.Email == userEmail).FirstOrDefaultAsync();
            var project = user?.Projects?.FirstOrDefault(p => p._id == projectId);
            return project?.LineItems?.FirstOrDefault(li => li.Id == lineItemId);
        }

        public async Task CreateLineItemAsync(string userEmail, string projectId, LineItem lineItem)
        {
            // Find the user and the project within the user
            var user = await _usersCollection.Find(u => u.Email == userEmail).FirstOrDefaultAsync();
            if (user == null) throw new Exception("User not found");

            var project = user.Projects?.FirstOrDefault(p => p._id == projectId);
            if (project == null) throw new Exception("Project not found");
            if (project?.LineItems != null)
            // Check if the line item already exists to avoid duplicate entries
            if (project.LineItems.Any(li => li.Id == lineItem.Id))
            {
                throw new Exception("Line item already exists");
            }

            // Assign a new ID to the line item
            lineItem.Id = ObjectId.GenerateNewId().ToString();

            // Add the line item to the project's line items list
            if (project != null)
            {
                project.LineItems = project.LineItems ?? new List<LineItem>();
                project.LineItems.Add(lineItem);
            }

            // Update the user document in the database
            await _usersCollection.ReplaceOneAsync(u => u.Id == user.Id, user);
        }



        public async Task UpdateLineItemAsync(string userEmail, string projectId, LineItem updatedLineItem)
        {
            // Find the user and the project within the user
            var user = await _usersCollection.Find(u => u.Email == userEmail).FirstOrDefaultAsync();
            if (user == null) throw new Exception("User not found");

            var project = user.Projects?.FirstOrDefault(p => p._id == projectId);
            if (project == null) throw new Exception("Project not found");

            // Find the existing line item in the project's line items list
            var lineItem = project.LineItems?.FirstOrDefault(li => li.Id == updatedLineItem.Id);
            if (lineItem == null) throw new Exception("Line item not found");

            // Update the properties of the line item
            lineItem.LineItemName = updatedLineItem.LineItemName;
            lineItem.NumberBids = updatedLineItem.NumberBids;
            lineItem.Budget = updatedLineItem.Budget;
            lineItem.Notes = updatedLineItem.Notes;

            // Update the user document in the database
            await _usersCollection.ReplaceOneAsync(u => u.Id == user.Id, user);
        }

        public async Task UpdateLineItemSubsAsync(string userEmail, string projectId, LineItem updatedLineItem, Subcontractor updatedSubcontractor)
        {
            // Find the user and the project within the user
            var user = await _usersCollection.Find(u => u.Email == userEmail).FirstOrDefaultAsync();
            if (user == null) throw new Exception("User not found");

            var project = user.Projects?.FirstOrDefault(p => p._id == projectId);
            if (project == null) throw new Exception("Project not found");

            var subcontractor = user.Subcontractors?.FirstOrDefault(sub => sub.CompanyName == updatedSubcontractor.CompanyName);
            if (subcontractor != null)
            {
                updatedSubcontractor.Id = subcontractor.Id;
            } 

            // Find the existing line item in the project's line items list
            var lineItem = project.LineItems?.FirstOrDefault(li => li.Id == updatedLineItem.Id);
            if (lineItem == null) throw new Exception("Line item not found");

            // Update the properties of the line item
            if (lineItem.Subcontractors != null)
            {
                if (updatedSubcontractor.Id != null)
                {
                    var isNew = true;
                    for (int i = 0; i < lineItem.Subcontractors.Count; i++)
                    {
                        if (lineItem.Subcontractors[i].Id == updatedSubcontractor.Id)
                        {
                            lineItem.Subcontractors[i] = updatedSubcontractor;
                            isNew = false;
                            break;
                        }
                    }
                    if (isNew)
                    {
                        lineItem.Subcontractors.Add(updatedSubcontractor);
                    }
                }
                else
                {
                    lineItem.Subcontractors.Add(updatedSubcontractor);
                }
            }
            else
            {
                lineItem.Subcontractors = [];
                lineItem.Subcontractors.Add(updatedSubcontractor);
            }


            // Update the user document in the database
            await _usersCollection.ReplaceOneAsync(u => u.Id == user.Id, user);
        }


        public async Task DeleteLineItemAsync(string userEmail, string projectId, string lineItemId)
        {
            var update = Builders<User>.Update.PullFilter("Projects.$[project].LineItems",
                Builders<LineItem>.Filter.Eq("Id", lineItemId));
            var arrayFilters = new List<ArrayFilterDefinition> {
                new BsonDocumentArrayFilterDefinition<BsonDocument>(new BsonDocument("project._id", projectId))
            };

            var updateOptions = new UpdateOptions { ArrayFilters = arrayFilters };

            await _usersCollection.UpdateOneAsync(
                Builders<User>.Filter.Eq(u => u.Email, userEmail),
                update,
                updateOptions
            );
        }

        public async Task DeleteLineItemSubAsync(string userEmail, string projectId, string lineItemId, Subcontractor deletedSubcontractor)
        {
            // Find the user and the project within the user
            var user = await _usersCollection.Find(u => u.Email == userEmail).FirstOrDefaultAsync();
            if (user == null) throw new Exception("User not found");

            var project = user.Projects?.FirstOrDefault(p => p._id == projectId);
            if (project == null) throw new Exception("Project not found");

            // Find the existing line item in the project's line items list
            var lineItem = project.LineItems?.FirstOrDefault(li => li.Id == deletedSubcontractor.Id);
            if (lineItem == null) throw new Exception("Line item not found");

            // Remove the subcontractor from the list if the ID matches
            if (lineItem.Subcontractors != null)
            {
                lineItem.Subcontractors.RemoveAll(sub => sub.Id == deletedSubcontractor.Id);
            }

            // Update the user document in the database
            await _usersCollection.ReplaceOneAsync(u => u.Id == user.Id, user);

        }

    }
}
