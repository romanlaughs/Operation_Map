using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using Operation_Map.Server.Helpers;
using Operation_Map.Server.Models;

namespace Operation_Map.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MaterialController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public MaterialController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("{userEmail}/projects/{projectId}/accounting-materials")]
        public async Task<ActionResult<List<AccountingMaterial>>> GetAccountingMaterials(string userEmail, string projectId)
        {
            var user = await _userRepository.GetUserByEmailAsync(userEmail);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var project = user.Projects?.FirstOrDefault(p => p._id == projectId);
            if (project == null)
            {
                return NotFound("Project not found");
            }

            return Ok(project.AccountingMaterials ?? new List<AccountingMaterial>());
        }

        [HttpGet("{userEmail}/projects/{projectId}/accounting-materials/{materialId}")]
        public async Task<ActionResult<AccountingMaterial>> GetAccountingMaterialById(string userEmail, string projectId, string materialId)
        {
            var user = await _userRepository.GetUserByEmailAsync(userEmail);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var project = user.Projects?.FirstOrDefault(p => p._id == projectId);
            if (project == null)
            {
                return NotFound("Project not found");
            }

            var material = project.AccountingMaterials?.FirstOrDefault(m => m.Id == materialId);
            if (material == null)
            {
                return NotFound("Material not found");
            }

            return Ok(material);
        }

        [HttpPost("{userEmail}/projects/{projectId}/accounting-materials")]
        public async Task<ActionResult<AccountingMaterial>> AddAccountingMaterial(string userEmail, string projectId, [FromBody] AccountingMaterial material)
        {
            var user = await _userRepository.GetUserByEmailAsync(userEmail);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var project = user.Projects?.FirstOrDefault(p => p._id == projectId);
            if (project == null)
            {
                return NotFound("Project not found");
            }

            material.Id = ObjectId.GenerateNewId().ToString();
            
            if (project.AccountingMaterials == null)
            {
                project.AccountingMaterials = new List<AccountingMaterial>();
            }

            project.AccountingMaterials.Add(material);
            await _userRepository.UpdateUserAsync(user);

            return CreatedAtAction(nameof(GetAccountingMaterialById), new { userEmail = userEmail, projectId = projectId, materialId = material.Id }, material);
        }

        [HttpPut("{userEmail}/projects/{projectId}/accounting-materials/{materialId}")]
        public async Task<IActionResult> UpdateAccountingMaterial(string userEmail, string projectId, string materialId, [FromBody] AccountingMaterial materialIn)
        {
            var user = await _userRepository.GetUserByEmailAsync(userEmail);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var project = user.Projects?.FirstOrDefault(p => p._id == projectId);
            if (project == null)
            {
                return NotFound("Project not found");
            }

            var material = project.AccountingMaterials?.FirstOrDefault(m => m.Id == materialId);
            if (material == null)
            {
                return NotFound("Material not found");
            }

            material.MaterialType = materialIn.MaterialType;
            material.SupplierOrStore = materialIn.SupplierOrStore;
            material.ItemNumber = materialIn.ItemNumber;
            material.DatePurchased = materialIn.DatePurchased;
            material.Price = materialIn.Price;
            material.AdditionalOrder = materialIn.AdditionalOrder;
            material.Payments = materialIn.Payments;

            await _userRepository.UpdateUserAsync(user);

            return NoContent();
        }

        [HttpDelete("{userEmail}/projects/{projectId}/accounting-materials/{materialId}")]
        public async Task<IActionResult> DeleteAccountingMaterial(string userEmail, string projectId, string materialId)
        {
            var user = await _userRepository.GetUserByEmailAsync(userEmail);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var project = user.Projects?.FirstOrDefault(p => p._id == projectId);
            if (project == null)
            {
                return NotFound("Project not found");
            }

            var material = project.AccountingMaterials?.FirstOrDefault(m => m.Id == materialId);
            if (material == null)
            {
                return NotFound("Material not found");
            }

            project.AccountingMaterials.Remove(material);
            await _userRepository.UpdateUserAsync(user);

            return NoContent();
        }
    }
}
