using Microsoft.AspNetCore.Mvc;
using Operation_Map.Server.Helpers;
using Operation_Map.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Operation_Map.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LineItemsController : ControllerBase
    {
        private readonly ILineItemRepository _lineItemRepository;
        private readonly IUserRepository _userRepository;

        public LineItemsController(ILineItemRepository lineItemRepository, IUserRepository userRepository)
        {
            _lineItemRepository = lineItemRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<LineItem>>> GetLineItems([FromQuery] string userEmail, [FromQuery] string projectId)
        {
            var user = await _userRepository.GetUserByEmailAsync(userEmail);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var lineItems = await _lineItemRepository.GetLineItemsAsync(userEmail, projectId);
            return Ok(lineItems);
        }

        [HttpGet("{lineItemId}")]
        public async Task<ActionResult<LineItem>> GetLineItem([FromQuery] string userEmail, [FromQuery] string projectId, string lineItemId)
        {
            var lineItem = await _lineItemRepository.GetLineItemByIdAsync(userEmail, projectId, lineItemId);
            if (lineItem == null)
            {
                return NotFound("Line item not found");
            }

            return Ok(lineItem);
        }

        [HttpPost]
        public async Task<ActionResult<LineItem>> CreateLineItem([FromQuery] string userEmail, [FromQuery] string projectId, [FromBody] LineItem lineItem)
        {
            //Validate the user before proceeding
             var user = await _userRepository.GetUserByEmailAsync(userEmail);
             if (user == null)
             {
                 return NotFound("User not found");
             }

            try
            {
                await _lineItemRepository.CreateLineItemAsync(userEmail, projectId, lineItem);
                return StatusCode(201); // Created status code
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); // Return a bad request status with the exception message
            }
        }
        [HttpPut("{lineItemId}")]
        public async Task<IActionResult> UpdateLineItem([FromQuery] string userEmail, [FromQuery] string projectId, string lineItemId, [FromBody] LineItem lineItemIn)
        {
            var user = await _userRepository.GetUserByEmailAsync(userEmail);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var existingLineItem = await _lineItemRepository.GetLineItemByIdAsync(userEmail, projectId, lineItemId);
            if (existingLineItem == null)
            {
                return NotFound("Line item not found");
            }

            lineItemIn.Id = lineItemId;
            await _lineItemRepository.UpdateLineItemAsync(userEmail, projectId, lineItemIn);

            return NoContent();
        }

        [HttpPut("sub/{lineItemId}")]
        public async Task<IActionResult> UpdateLineItemSubsAsync([FromQuery] string userEmail, [FromQuery] string projectId, string lineItemId, [FromBody] Subcontractor updatedSubcontractor)
        {
            var user = await _userRepository.GetUserByEmailAsync(userEmail);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var existingLineItem = await _lineItemRepository.GetLineItemByIdAsync(userEmail, projectId, lineItemId);
            if (existingLineItem == null)
            {
                return NotFound("Line item not found");
            }

            await _lineItemRepository.UpdateLineItemSubsAsync(userEmail, projectId, existingLineItem, updatedSubcontractor);

            return NoContent();
        }


        [HttpDelete("{lineItemId}")]
        public async Task<IActionResult> DeleteLineItem([FromQuery] string userEmail, [FromQuery] string projectId, string lineItemId)
        {
            var user = await _userRepository.GetUserByEmailAsync(userEmail);
            if (user == null)
            {
                return NotFound("User not found");
            }

            await _lineItemRepository.DeleteLineItemAsync(userEmail, projectId, lineItemId);

            return NoContent();
        }

        [HttpDelete("sub/{lineItemId}")]
        public async Task<IActionResult> DeleteLineItemSub([FromQuery] string userEmail, [FromQuery] string projectId, string lineItemId, [FromBody] Subcontractor subcontractor)
        {
            var user = await _userRepository.GetUserByEmailAsync(userEmail);
            if (user == null)
            {
                return NotFound("User not found");
            }

            await _lineItemRepository.DeleteLineItemSubAsync(userEmail, projectId, lineItemId, subcontractor);

            return NoContent();
        }
    }
}
