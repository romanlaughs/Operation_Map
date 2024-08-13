using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Route("api/blob")]
[ApiController]
[Authorize]
public class BlobController : ControllerBase
{
    private readonly BlobService _blobService;

    public BlobController(BlobService blobService)
    {
        _blobService = blobService;
    }

    [HttpPost("upload")]
    public async Task<IActionResult> UploadFile([FromForm] IFormFile file, [FromForm] string projectId)
    {
        if (file == null || file.Length == 0)
            return BadRequest("File not selected");

        using (var stream = file.OpenReadStream())
        {
            await _blobService.UploadFileAsync(stream, file.FileName, projectId);
        }

        return Ok("File uploaded successfully");
    }

    [HttpGet("download/{projectId}/{fileType}/{fileName}")]
    public async Task<IActionResult> DownloadFile(string projectId, string fileName)
    {
        var stream = await _blobService.GetFileAsync(projectId, fileName);
        return File(stream, "application/octet-stream", fileName);
    }

    [HttpDelete("delete/{projectId}/{fileName}")]
    public async Task<IActionResult> DeleteFile(string projectId, string fileName)
    {
        await _blobService.DeleteFileAsync(projectId, fileName);
        return Ok("File deleted successfully");
    }
}
