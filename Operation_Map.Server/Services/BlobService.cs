using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Azure.Storage.Sas;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Threading.Tasks;

public class BlobService
{
    private readonly string storageConnectionString;

    public BlobService(IConfiguration configuration)
    {
        storageConnectionString = configuration["AzureStorage:BlobServiceUrl"] ?? throw new ArgumentNullException(nameof(configuration), "AzureStorage connection string is not configured.");
    }

    public async Task<string> UploadFileToBlobAsync(string containerName, string blobName, Stream fileStream, string contentType)
    {
        var blobServiceClient = new BlobServiceClient(storageConnectionString);
        var blobContainerClient = blobServiceClient.GetBlobContainerClient(containerName);

        // Create the container if it doesn't exist
        await blobContainerClient.CreateIfNotExistsAsync(PublicAccessType.BlobContainer);

        var blobClient = blobContainerClient.GetBlobClient(blobName);

        await blobClient.UploadAsync(fileStream, new BlobHttpHeaders { ContentType = contentType });

        return blobClient.Uri.ToString();
    }

    public async Task<Stream> GetFileFromBlobAsync(string containerName, string blobName)
    {
        var blobServiceClient = new BlobServiceClient(storageConnectionString);
        var blobContainerClient = blobServiceClient.GetBlobContainerClient(containerName);
        var blobClient = blobContainerClient.GetBlobClient(blobName);

        var blobExists = await blobClient.ExistsAsync();
        if (!blobExists)
        {
            return null;
        }

        var downloadInfo = await blobClient.DownloadAsync();
        return downloadInfo.Value.Content;
    }

    public async Task<List<Uri>> GetFilesByItemIdAsync(string containerName, string itemId)
    {
        var blobServiceClient = new BlobServiceClient(storageConnectionString);
        var blobContainerClient = blobServiceClient.GetBlobContainerClient(containerName);
        var fileList = new List<Uri>();

        await foreach (BlobItem blobItem in blobContainerClient.GetBlobsAsync())
        {
            if (blobItem.Name.Contains(itemId))
            {
                var blobClient = blobContainerClient.GetBlobClient(blobItem.Name);
                fileList.Add(blobClient.Uri);
            }
        }

        return fileList;
    }


    public async Task DeleteFileFromBlobAsync(string containerName, string blobName)
    {
        var blobServiceClient = new BlobServiceClient(storageConnectionString);
        var blobContainerClient = blobServiceClient.GetBlobContainerClient(containerName);
        var blobClient = blobContainerClient.GetBlobClient(blobName);
        await blobClient.DeleteIfExistsAsync();
    }

    public string GenerateSasToken(string containerName, string blobName, DateTimeOffset expiryTime, BlobSasPermissions permissions)
    {
        var blobServiceClient = new BlobServiceClient(storageConnectionString);
        var blobContainerClient = blobServiceClient.GetBlobContainerClient(containerName);
        var blobClient = blobContainerClient.GetBlobClient(blobName);

        var sasBuilder = new BlobSasBuilder
        {
            BlobContainerName = containerName,
            BlobName = blobName,
            Resource = "b",
            ExpiresOn = expiryTime
        };
        sasBuilder.SetPermissions(permissions);

        var sasToken = blobClient.GenerateSasUri(sasBuilder).Query;
        return sasToken;
    }
}
