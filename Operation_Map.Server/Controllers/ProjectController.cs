using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Operation_Map.Server.Helpers;
using Operation_Map.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Operation_Map.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IUserRepository _userRepository;

        public ProjectController(IProjectRepository projectRepository, IUserRepository userRepository)
        {
            _projectRepository = projectRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<Project>>> Get()
        {
            var projects = await _projectRepository.GetProjectsAsync();
            return Ok(projects);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> Get(string id)
        {
            var project = await _projectRepository.GetProjectByIdAsync(id);
            if (project == null)
            {
                return NotFound();
            }
            return Ok(project);
        }

        [HttpPost("create")]
        public async Task<ActionResult<Project>> Create([FromQuery] string userEmail, [FromBody] Project project)
        {
            var user = await _userRepository.GetUserByEmailAsync(userEmail);
            if (user == null)
            {
                return NotFound("User not found");
            }

            await _projectRepository.CreateProjectAsync(project);

            if (user.Projects == null)
            {
                user.Projects = new List<Project>();
            }

            user.Projects.Add(project);

           await _userRepository.UpdateUserAsync(user);

            return CreatedAtAction(nameof(Get), new { id = project._id }, project);
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update([FromQuery] string email, [FromQuery] string id, [FromBody] Project projectIn)
        {
            var project = await _projectRepository.GetProjectByIdAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            var user = await _userRepository.GetUserByEmailAsync(email);
            if (user == null)
            {
                return NotFound("User not found");
            }

            projectIn._id = id;
            await _projectRepository.UpdateProjectAsync(projectIn);

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var project = await _projectRepository.GetProjectByIdAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            await _projectRepository.DeleteProjectAsync(id);
            return NoContent();
        }
    }
}
