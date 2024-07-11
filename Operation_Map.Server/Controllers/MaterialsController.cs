using Microsoft.AspNetCore.Mvc;
using Operation_Map.Server.Helpers;
using Operation_Map.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Operation_Map.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaterialsController : ControllerBase
    {
        private readonly IMaterialRepository _materialRepository;
        private readonly IUserRepository _userRepository;

        public MaterialsController(IMaterialRepository materialRepository, IUserRepository userRepository)
        {
            _materialRepository = materialRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<Material>>> Get([FromQuery] string userEmail)
        {
            var user = await _userRepository.GetUserByEmailAsync(userEmail);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var filteredMaterials = user.Materials?.Where(m => m.Id != null).ToList();
            return Ok(filteredMaterials);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Material>> GetMaterial([FromQuery] string userEmail, string id)
        {
            var user = await _userRepository.GetUserByEmailAsync(userEmail);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var filteredMaterials = user.Materials?.Where(m => m.Id == id).ToList();
            return Ok(filteredMaterials);
        }

        [HttpPost]
        public async Task<ActionResult<Material>> Create([FromQuery] string userEmail, [FromBody] Material material)
        {
            var user = await _userRepository.GetUserByEmailAsync(userEmail);
            if (user == null)
            {
                return NotFound("User not found");
            }

            await _materialRepository.CreateMaterialAsync(material);
            if (user.Materials == null)
            {
                user.Materials = new List<Material>();
            }

            user.Materials.Add(material);

            await _userRepository.UpdateUserAsync(user);

            return CreatedAtAction(nameof(Get), new { id = material.Id }, material);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromQuery] string userEmail, string id, [FromBody] Material materialIn)
        {
            var user = await _userRepository.GetUserByEmailAsync(userEmail);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var material = user.Materials?.FirstOrDefault(m => m.Id == id);
            if (material == null)
            {
                return NotFound("Project not found");
            }

            material.NameDescription = materialIn.NameDescription;
            material.DatePurchased = materialIn.DatePurchased;
            material.PlacePurchased = materialIn.PlacePurchased;
            material.Notes = materialIn.Notes;
            material.ItemNumber = materialIn.ItemNumber;
            material.PhotoUploadUrl = materialIn.PhotoUploadUrl;
            material.ProjectIDs = materialIn.ProjectIDs;

            await _userRepository.UpdateUserAsync(user);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string userEmail, string id)
        {
            var user = await _userRepository.GetUserByEmailAsync(userEmail);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var material = user.Materials?.FirstOrDefault(m => m.Id == id);
            if (material == null)
            {
                return NotFound("Project not found");
            }
            // Remove the project from the user's projects list
            user.Materials?.Remove(material);

            // Save the updated user to the database
            await _userRepository.UpdateUserAsync(user);
            await _materialRepository.DeleteMaterialAsync(id);

            return NoContent();
        }

        [HttpGet("byProjectId")]
        public async Task<ActionResult<List<Material>>> GetMaterialsByProjectId([FromQuery] string userEmail, [FromQuery] string projectId)
        {
            var user = await _userRepository.GetUserByEmailAsync(userEmail);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var filteredMaterials = user.Materials?.Where(m => m.ProjectIDs.Contains(projectId)).ToList();
            return Ok(filteredMaterials);
        }
    }
}
