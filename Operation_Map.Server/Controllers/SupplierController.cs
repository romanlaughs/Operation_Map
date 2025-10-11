using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using Operation_Map.Server.Helpers;
using Operation_Map.Server.Models;

[ApiController]
[Route("api/[controller]")]
public class SupplierController : ControllerBase
{
    private readonly IUserRepository _userRepository;

    public SupplierController(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    [HttpGet("{userEmail}/suppliers")]
    public async Task<ActionResult<List<Supplier>>> GetSuppliers(string userEmail)
    {
        var user = await _userRepository.GetUserByEmailAsync(userEmail);
        if (user == null)
        {
            return NotFound("User not found");
        }

        return Ok(user.Suppliers);
    }

    [HttpGet("{userEmail}/suppliers/{supplierId}")]
    public async Task<ActionResult<Supplier>> GetSupplierById(string userEmail, string supplierId)
    {
        var user = await _userRepository.GetUserByEmailAsync(userEmail);
        if (user == null)
        {
            return NotFound("User not found");
        }

        var supplier = user.Suppliers.FirstOrDefault(s => s.Id == supplierId);
        if (supplier == null)
        {
            return NotFound("Supplier not found");
        }

        return Ok(supplier);
    }

    [HttpPost("{userEmail}/suppliers")]
    public async Task<ActionResult<Supplier>> AddSupplier(string userEmail, [FromBody] Supplier supplier)
    {
        var user = await _userRepository.GetUserByEmailAsync(userEmail);
        if (user == null)
        {
            return NotFound("User not found");
        }

        supplier.Id = ObjectId.GenerateNewId().ToString();
        user.Suppliers.Add(supplier);
        await _userRepository.UpdateUserAsync(user);

        return CreatedAtAction(nameof(GetSupplierById), new { userEmail = userEmail, supplierId = supplier.Id }, supplier);
    }

    [HttpPut("{userEmail}/suppliers/{supplierId}")]
    public async Task<IActionResult> UpdateSupplier(string userEmail, string supplierId, [FromBody] Supplier supplierIn)
    {
        var user = await _userRepository.GetUserByEmailAsync(userEmail);
        if (user == null)
        {
            return NotFound("User not found");
        }

        var supplier = user.Suppliers.FirstOrDefault(s => s.Id == supplierId);
        if (supplier == null)
        {
            return NotFound("Supplier not found");
        }

        supplier.CompanyName = supplierIn.CompanyName;
        supplier.SalespersonName = supplierIn.SalespersonName;
        supplier.Phone = supplierIn.Phone;
        supplier.Email = supplierIn.Email;
        supplier.Address = supplierIn.Address;

        await _userRepository.UpdateUserAsync(user);

        return NoContent();
    }

    [HttpDelete("{userEmail}/suppliers/{supplierId}")]
    public async Task<IActionResult> DeleteSupplier(string userEmail, string supplierId)
    {
        var user = await _userRepository.GetUserByEmailAsync(userEmail);
        if (user == null)
        {
            return NotFound("User not found");
        }

        var supplier = user.Suppliers.FirstOrDefault(s => s.Id == supplierId);
        if (supplier == null)
        {
            return NotFound("Supplier not found");
        }

        user.Suppliers.Remove(supplier);
        await _userRepository.UpdateUserAsync(user);

        return NoContent();
    }

    [HttpDelete("{userEmail}/suppliers")]
    public async Task<IActionResult> BulkDeleteSuppliers(string userEmail, [FromBody] List<string> supplierIds)
    {
        var user = await _userRepository.GetUserByEmailAsync(userEmail);
        if (user == null)
        {
            return NotFound("User not found");
        }

        user.Suppliers.RemoveAll(s => supplierIds.Contains(s.Id));
        await _userRepository.UpdateUserAsync(user);

        return NoContent();
    }
}
