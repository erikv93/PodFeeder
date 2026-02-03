using FastEndpoints;
using Microsoft.AspNetCore.StaticFiles;
using PodFeeder.Api;
using PodFeeder.Api.Database;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddScoped<IFeedReader, FeedReader>();
builder.Services.AddFastEndpoints();

// add db
var dbPath = Environment.GetEnvironmentVariable("DATABASE_PATH") ?? "podcasts.db";
builder.Services.AddSingleton<IDb<Podcast>>(new Db<Podcast>(dbPath));


builder.WebHost.UseUrls("http://+:7979");


var app = builder.Build();
app.UseFastEndpoints();

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

// Fallback to index.html for Angular routing
app.MapFallbackToFile("index.html");

app.Run();
