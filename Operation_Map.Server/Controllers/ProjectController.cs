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
        public async Task<ActionResult<List<Project>>> Get([FromQuery] string userEmail, int projectStatus)
        {
            var user = await _userRepository.GetUserByEmailAsync(userEmail);
            if (user == null)
            {
                return NotFound("User not found");
            }
            var filteredProjects = user.Projects?.Where(p => p.ProjectStatus == projectStatus).ToList();
            return Ok(filteredProjects);
        }

        [HttpGet("projectbyid")]
        public async Task<ActionResult<Project>> GetProject([FromQuery] string userEmail, [FromQuery] string projectId)
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
            var user = await _userRepository.GetUserByEmailAsync(email);
            if (user == null)
            {
                return NotFound("User not found");
            }
            var project = user.Projects?.FirstOrDefault(p => p._id == id);
            if (project == null)
            {
                return NotFound("Project not found");
            }

            // Update the existing project properties with the incoming project properties
            project.Name = projectIn.Name;
            project.Address1 = projectIn.Address1;
            project.Address2 = projectIn.Address2;
            project.City = projectIn.City;
            project.State = projectIn.State;
            project.ZipCode = projectIn.ZipCode;
            project.StartDate = projectIn.StartDate;
            project.Started = projectIn.Started;
            project.Finished = projectIn.Finished;
            project.FinishDate = projectIn.FinishDate;
            project.CompletionPercentage = projectIn.CompletionPercentage;
            project.Units = projectIn.Units;
            project.ProjectEmail = projectIn.ProjectEmail;
            project.ProjectStatus = projectIn.ProjectStatus;
            project.Bathrooms = projectIn.Bathrooms;
            project.SquareFootage = projectIn.SquareFootage;
            project.Bedrooms = projectIn.Bedrooms;
            project.LineItemOptions = projectIn.LineItemOptions;

            // Update the user in the repository
            await _userRepository.UpdateUserAsync(user);

            return NoContent();
        }

        [HttpPut("updateStatus")]
        public async Task<IActionResult> UpdateStatus([FromQuery] string email, [FromQuery] string id, [FromBody] int status)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);
            if (user == null)
            {
                return NotFound("User not found");
            }
            var project = user.Projects?.FirstOrDefault(p => p._id == id);
            if (project == null)
            {
                return NotFound("Project not found");
            }

            // Update the existing project status with the incoming project status
            project.ProjectStatus = status;

            // Update the user in the repository
            await _userRepository.UpdateUserAsync(user);

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string email, string id)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);
            if (user == null)
            {
                return NotFound("User not found");
            }
            var project = user.Projects?.FirstOrDefault(p => p._id == id);
            if (project == null)
            {
                return NotFound("Project not found");
            }

            // Remove the project from the user's projects list
            user.Projects?.Remove(project);

            // Save the updated user to the database
            await _userRepository.UpdateUserAsync(user);

            // Optionally, also delete the project from the projects collection
            await _projectRepository.DeleteProjectAsync(id);

            return NoContent();
        }
    }
}
