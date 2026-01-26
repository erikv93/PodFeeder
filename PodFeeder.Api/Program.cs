using Microsoft.AspNetCore.StaticFiles;
using PodFeeder.Api;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddScoped<IFeedReader, FeedReader>();

// Use DATABASE_PATH env var or default to podcasts.db
var dbPath = Environment.GetEnvironmentVariable("DATABASE_PATH") ?? "podcasts.db";
builder.Services.AddSingleton<IPodcastDb, PodcastDb>(sp => new PodcastDb(dbPath));

// Configure to listen on port 7979
builder.WebHost.UseUrls("http://+:7979");

var app = builder.Build();

// Serve static files from wwwroot (Angular frontend) with proper MIME types
var provider = new FileExtensionContentTypeProvider();
provider.Mappings[".js"] = "application/javascript";
provider.Mappings[".css"] = "text/css";
provider.Mappings[".json"] = "application/json";    
provider.Mappings[".woff"] = "font/woff";
provider.Mappings[".woff2"] = "font/woff2";
provider.Mappings[".ttf"] = "font/ttf";
provider.Mappings[".eot"] = "application/vnd.ms-fontobject";
provider.Mappings[".svg"] = "image/svg+xml";

app.UseStaticFiles(new StaticFileOptions { ContentTypeProvider = provider });

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
else
{
    app.UseHttpsRedirection();
}

app.UseAuthorization();

app.MapControllers();

// Fallback to index.html for Angular routing
app.MapFallbackToFile("index.html");

app.Run();
