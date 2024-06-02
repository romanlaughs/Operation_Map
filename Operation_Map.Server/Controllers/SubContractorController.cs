using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using Operation_Map.Server.Helpers;
using Operation_Map.Server.Models;

[ApiController]
[Route("api/[controller]")]
public class SubcontractorController : ControllerBase
{
    private readonly IUserRepository _userRepository;

    public SubcontractorController(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    [HttpGet("{userEmail}/subcontractors")]
    public async Task<ActionResult<List<Subcontractor>>> GetSubcontractors(string userEmail)
    {
        var user = await _userRepository.GetUserByEmailAsync(userEmail);
        if (user == null)
        {
            return NotFound("User not found");
        }

        return Ok(user.Subcontractors);
    }

    [HttpGet("{userEmail}/subcontractors/{subcontractorId}")]
    public async Task<ActionResult<Subcontractor>> GetSubcontractorById(string userEmail, string subcontractorId)
    {
        var user = await _userRepository.GetUserByEmailAsync(userEmail);
        if (user == null)
        {
            return NotFound("User not found");
        }

        var subcontractor = user.Subcontractors.FirstOrDefault(s => s.Id == subcontractorId);
        if (subcontractor == null)
        {
            return NotFound("Subcontractor not found");
        }

        return Ok(subcontractor);
    }

    [HttpPost("{userEmail}/subcontractors")]
    public async Task<ActionResult<Subcontractor>> AddSubcontractor(string userEmail, [FromBody] Subcontractor subcontractor)
    {
        var user = await _userRepository.GetUserByEmailAsync(userEmail);
        if (user == null)
        {
            return NotFound("User not found");
        }

        subcontractor.Id = ObjectId.GenerateNewId().ToString(); // Ensure a new ID is generated
        user.Subcontractors.Add(subcontractor);
        await _userRepository.UpdateUserAsync(user);

        return CreatedAtAction(nameof(GetSubcontractorById), new { userEmail = userEmail, subcontractorId = subcontractor.Id }, subcontractor);
    }

    [HttpPut("{userEmail}/subcontractors/{subcontractorId}")]
    public async Task<IActionResult> UpdateSubcontractor(string userEmail, string subcontractorId, [FromBody] Subcontractor subcontractorIn)
    {
        var user = await _userRepository.GetUserByEmailAsync(userEmail);
        if (user == null)
        {
            return NotFound("User not found");
        }

        var subcontractor = user.Subcontractors.FirstOrDefault(s => s.Id == subcontractorId);
        if (subcontractor == null)
        {
            return NotFound("Subcontractor not found");
        }

        // Update the subcontractor fields
        subcontractor.ContactName = subcontractorIn.ContactName;
        subcontractor.CompanyName = subcontractorIn.CompanyName;
        subcontractor.CompanyType = subcontractorIn.CompanyType;
        subcontractor.PercentagePaid = subcontractorIn.PercentagePaid;
        subcontractor.PdfUpload = subcontractorIn.PdfUpload;
        subcontractor.Address = subcontractorIn.Address;
        subcontractor.ContactPhoneNumber = subcontractorIn.ContactPhoneNumber;
        subcontractor.Website = subcontractorIn.Website;
        subcontractor.ContactEmail = subcontractorIn.ContactEmail;
        subcontractor.Ubi = subcontractorIn.Ubi;
        subcontractor.License = subcontractorIn.License;
        subcontractor.TaxId = subcontractorIn.TaxId;
        subcontractor.Other = subcontractorIn.Other;
        subcontractor.InsuranceCompany = subcontractorIn.InsuranceCompany;
        subcontractor.InsuranceAgent = subcontractorIn.InsuranceAgent;
        subcontractor.InsurancePhone = subcontractorIn.InsurancePhone;
        subcontractor.InsuranceEmail = subcontractorIn.InsuranceEmail;
        subcontractor.AdditionalInsured = subcontractorIn.AdditionalInsured;
        subcontractor.CertificatePDFURL = subcontractorIn.CertificatePDFURL;
        subcontractor.AdditionalInsurancePDFURL = subcontractorIn.AdditionalInsurancePDFURL;

        await _userRepository.UpdateUserAsync(user);

        return NoContent();
    }

    [HttpDelete("{userEmail}/subcontractors/{subcontractorId}")]
    public async Task<IActionResult> DeleteSubcontractor(string userEmail, string subcontractorId)
    {
        var user = await _userRepository.GetUserByEmailAsync(userEmail);
        if (user == null)
        {
            return NotFound("User not found");
        }

        var subcontractor = user.Subcontractors.FirstOrDefault(s => s.Id == subcontractorId);
        if (subcontractor == null)
        {
            return NotFound("Subcontractor not found");
        }

        user.Subcontractors.Remove(subcontractor);
        await _userRepository.UpdateUserAsync(user);

        return NoContent();
    }

    [HttpDelete("{userEmail}/subcontractors")]
    public async Task<IActionResult> BulkDeleteSubcontractors(string userEmail, [FromBody] List<string> subcontractorIds)
    {
        var user = await _userRepository.GetUserByEmailAsync(userEmail);
        if (user == null)
        {
            return NotFound("User not found");
        }

        user.Subcontractors.RemoveAll(s => subcontractorIds.Contains(s.Id));
        await _userRepository.UpdateUserAsync(user);

        return NoContent();
    }
}
