using Operation_Map.Server.Controllers;
using Operation_Map.Server.Services;
using Auth0.AspNetCore.Authentication;
using Operation_Map.Server.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Register MongoDB class maps
MongoDBConfigService.RegisterClassMaps();

var configuration = builder.Configuration;

// Load environment variables into configuration
builder.Configuration
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddEnvironmentVariables();

// Add MongoDB service with environment variables
builder.Services.AddSingleton<MongoDBService>(sp => {
    var configuration = sp.GetRequiredService<IConfiguration>();
    var connectionString = configuration["MongoDB:ConnectionString"];
    var dbName = configuration["MongoDB:DatabaseName"];
    return new MongoDBService(connectionString, dbName);
});

// Configure Auth0 with environment variables
builder.Services.AddAuth0WebAppAuthentication(options => {
    options.Domain = configuration["Auth0:Domain"];
    options.ClientId = configuration["Auth0:ClientId"];
    options.ClientSecret = configuration["Auth0:ClientSecret"];
});

// Add repositories and other services
builder.Services.AddSingleton<IUserRepository, UserRepository>();
builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
builder.Services.AddScoped<IMaterialRepository, MaterialRepository>();
builder.Services.AddScoped<ISubcontractorGroupRepository, SubcontractorGroupRepository>();
builder.Services.AddScoped<ILineItemRepository, LineItemRepository>();
builder.Services.AddScoped<IInvoiceRepository, InvoiceRepository>();
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Logging.AddConsole();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.Authority = $"https://{configuration["Auth0:Domain"]}/";
    options.Audience = "https://operation-map/api";
    options.TokenValidationParameters = new TokenValidationParameters
    {
        NameClaimType = "name",
        RoleClaimType = "role"
    };
});

builder.Services.AddSingleton<BlobService>();

// Add Authorization Services
builder.Services.AddAuthorization();

var app = builder.Build();

// Middleware for serving default files and static files
app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline for development environment
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

// Map controllers and handle fallback for SPA
app.MapControllers();
app.MapFallbackToFile("/index.html");

app.Run();
