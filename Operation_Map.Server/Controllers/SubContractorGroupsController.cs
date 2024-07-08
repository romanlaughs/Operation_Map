using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using Operation_Map.Server.Helpers;
using Operation_Map.Server.Models;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class SubcontractorGroupsController : ControllerBase
{
    private readonly ISubcontractorGroupRepository _subcontractorGroupRepository;

    public SubcontractorGroupsController(ISubcontractorGroupRepository subcontractorGroupRepository)
    {
        _subcontractorGroupRepository = subcontractorGroupRepository;
    }

    [HttpPost("AddSubcontractors")]
    public async Task<IActionResult> AddSubcontractorsToGroup([FromBody] AddSubcontractorsRequest request)
    {
        var ID = ObjectId.GenerateNewId().ToString();
        var newGroup = new SubcontractorGroup
        {
            _id = ID,
            GroupName = request.GroupName,
            GroupCity = request.GroupCity,
            GroupType = request.GroupType,
            SubcontractorIds = request.SubcontractorIds ?? new List<string>(),
            CreatedDate = DateTime.UtcNow,
            UpdatedDate = DateTime.UtcNow
        };

        await _subcontractorGroupRepository.CreateSubcontractorGroupAsync(request.UserEmail, newGroup);
        return Ok();
    }

    [HttpGet("{userEmail}")]
    public async Task<ActionResult<List<SubcontractorGroup>>> GetSubcontractorGroups(string userEmail)
    {
        var groups = await _subcontractorGroupRepository.GetSubcontractorGroupsAsync(userEmail);
        return Ok(groups);
    }

    [HttpGet("{userEmail}/{groupId}")]
    public async Task<ActionResult<SubcontractorGroup>> GetSubcontractorGroupById(string userEmail, string groupId)
    {
        var group = await _subcontractorGroupRepository.GetSubcontractorGroupByIdAsync(userEmail, groupId);
        if (group == null)
        {
            return NotFound("Subcontractor group not found");
        }

        return Ok(group);
    }

    [HttpPost("{userEmail}/groups")]
    public async Task<ActionResult> CreateSubcontractorGroup(string userEmail, [FromBody] SubcontractorGroup subcontractorGroup)
    {
        await _subcontractorGroupRepository.CreateSubcontractorGroupAsync(userEmail, subcontractorGroup);
        return CreatedAtAction(nameof(GetSubcontractorGroupById), new { userEmail = userEmail, groupId = subcontractorGroup._id }, subcontractorGroup);
    }

    [HttpPut("{userEmail}/groups/{groupId}")]
    public async Task<IActionResult> UpdateSubcontractorGroup(string userEmail, string groupId, [FromBody] SubcontractorGroup subcontractorGroup)
    {
        var existingGroup = await _subcontractorGroupRepository.GetSubcontractorGroupByIdAsync(userEmail, groupId);
        if (existingGroup == null)
        {
            return NotFound("Subcontractor group not found");
        }

        await _subcontractorGroupRepository.UpdateSubcontractorGroupAsync(userEmail, subcontractorGroup);
        return NoContent();
    }

    [HttpDelete("{userEmail}/groups/{groupId}")]
    public async Task<IActionResult> DeleteSubcontractorGroup(string userEmail, string groupId)
    {
        var existingGroup = await _subcontractorGroupRepository.GetSubcontractorGroupByIdAsync(userEmail, groupId);
        if (existingGroup == null)
        {
            return NotFound("Subcontractor group not found");
        }

        await _subcontractorGroupRepository.DeleteSubcontractorGroupAsync(userEmail, groupId);
        return NoContent();
    }

    [HttpDelete("{userEmail}/groups/{groupId}/members")]
    public async Task<IActionResult> RemoveMemberFromSubcontractorGroup(string userEmail, string groupId, [FromQuery] string subcontractorId)
    {
        var existingGroup = await _subcontractorGroupRepository.GetSubcontractorGroupByIdAsync(userEmail, groupId);
        if (existingGroup == null)
        {
            return NotFound("Subcontractor group not found");
        }

        await _subcontractorGroupRepository.RemoveMemberFromSubcontractorGroupAsync(userEmail, groupId, subcontractorId);
        return NoContent();
    }
}

public class AddSubcontractorsRequest
{
    public string? UserEmail { get; set; }
    public string? GroupName { get; set; }
    public string? GroupCity { get; set; }
    public string? GroupType { get; set; }
    public List<string>? SubcontractorIds { get; set; }
}
