using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class FileController : ControllerBase
{
    private readonly BlobService _blobService;

    public FileController(BlobService blobService)
    {
        _blobService = blobService;
    }

    [HttpPost("upload")]
    public async Task<IActionResult> UploadFile([FromForm] IFormFile file, [FromForm] string containerName, [FromForm] string blobName)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("File is empty");
        }

        try
        {
            using (var stream = file.OpenReadStream())
            {
                var fileUrl = await _blobService.UploadFileToBlobAsync(containerName, blobName, stream, file.ContentType);
                return Ok(new { fileUrl });
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpGet("{containerName}/{blobName}")]
    public async Task<IActionResult> GetFile(string containerName, string blobName)
    {
        try
        {
            var fileStream = await _blobService.GetFileFromBlobAsync(containerName, blobName);
            if (fileStream == null)
            {
                return NotFound();
            }
            return File(fileStream, "application/octet-stream");
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpGet("{containerName}/search/{itemId}")]
    public async Task<IActionResult> GetFilesByItemId(string containerName, string itemId)
    {
        try
        {
            var fileList = await _blobService.GetFilesByItemIdAsync(containerName, itemId);
            if (fileList == null || fileList.Count == 0)
            {
                return NotFound();
            }
            return Ok(fileList);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }


    [HttpPut("{containerName}/{blobName}")]
    public async Task<IActionResult> UpdateFile(string containerName, string blobName, [FromForm] IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("File is empty");
        }

        try
        {
            using (var stream = file.OpenReadStream())
            {
                await _blobService.DeleteFileFromBlobAsync(containerName, blobName);
                var fileUrl = await _blobService.UploadFileToBlobAsync(containerName, blobName, stream, file.ContentType);
                return Ok(new { fileUrl });
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpDelete("{containerName}/{blobName}")]
    public async Task<IActionResult> DeleteFile(string containerName, string blobName)
    {
        try
        {
            await _blobService.DeleteFileFromBlobAsync(containerName, blobName);
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }
}
