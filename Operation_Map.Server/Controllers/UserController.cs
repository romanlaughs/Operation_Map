using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Operation_Map.Server.Models;
using Operation_Map.Server.Helpers;

namespace Operation_Map.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("email/{email}")]
        [Authorize]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            await _userRepository.CreateUserAsync(user);
            return CreatedAtAction(nameof(GetUserByEmail), new { email = user.Email }, user);
        }

        [HttpGet("info-complete/{email}")]
        [Authorize]
        public async Task<IActionResult> IsUserInfoComplete(string email)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);
            if (user == null)
            {
                return NotFound();
            }

            var isComplete = !string.IsNullOrEmpty(user.FirstName) && !string.IsNullOrEmpty(user.LastName) && !string.IsNullOrEmpty(user.Email);
            return Ok(new { isComplete });
        }

        [HttpPut("email/{email}")]
        [Authorize]
        public async Task<IActionResult> UpdateUser(string email, [FromBody] User updatedUser)
        {
            if (email != updatedUser.Email)
            {
                return BadRequest();
            }

            var existingUser = await _userRepository.GetUserByEmailAsync(email);
            if (existingUser == null)
            {
                return NotFound();
            }

            // Update only the necessary fields
            existingUser.FirstName = updatedUser.FirstName;
            existingUser.LastName = updatedUser.LastName;

            await _userRepository.UpdateUserAsync(existingUser);
            return NoContent();
        }


        [HttpDelete("email/{email}")]
        [Authorize]
        public async Task<IActionResult> DeleteUser(string email)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);
            if (user == null)
            {
                return NotFound();
            }

            await _userRepository.DeleteUserAsync(email);
            return NoContent();
        }
    }
}
