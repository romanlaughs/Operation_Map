using Operation_Map.Server.Controllers;
using Operation_Map.Server.Services;
using Auth0.AspNetCore.Authentication;
using Operation_Map.Server.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

MongoDBConfigService.RegisterClassMaps();

var configuration = builder.Configuration;

// Add MongoDB service
// Program.cs
builder.Services.AddSingleton<MongoDBService>(sp => {
    var configuration = sp.GetRequiredService<IConfiguration>();
    var connectionString = configuration["MongoDB:ConnectionString"];
    var dbName = configuration["MongoDB:DatabaseName"];
    return new MongoDBService(connectionString, dbName);
});


// Configure Auth0
builder.Services.AddAuth0WebAppAuthentication(options => {
    options.Domain = builder.Configuration["Auth0:Domain"];
    options.ClientId = builder.Configuration["Auth0:ClientId"];
    options.ClientSecret = builder.Configuration["Auth0:ClientSecret"];
});

builder.Services.AddSingleton<IUserRepository, UserRepository>();
// Add services to the container.

builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
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
    options.Authority = "https://dev-slgt1t3tb1o228qp.us.auth0.com/";
    options.Audience = "https://operation-map/api";
    options.TokenValidationParameters = new TokenValidationParameters
    {
        NameClaimType = "name",
        RoleClaimType = "role"
    };
});

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
