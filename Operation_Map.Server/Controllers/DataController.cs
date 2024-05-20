using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using Operation_Map.Server.Models;  // Adjust namespace if needed
using System;
using System.Linq;

namespace Operation_Map.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DataController : ControllerBase
    {
        private readonly MongoDBService _mongoDbService;

        public DataController(MongoDBService mongoDbService)
        {
            _mongoDbService = mongoDbService;
        }

        [HttpGet("users")]
        public IActionResult GetUsers()
        {
            try
            {
                var collection = _mongoDbService.GetCollection<User>("Users");
                var users = collection.Find(user => true).ToList(); // Fetches all documents
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error: " + ex.Message);
            }
        }
    }
}
