using FastEndpoints;
using PodFeeder.Api.Database;

namespace PodFeeder.Api.Endpoints.AddPodcast;

public class AddPodcastEndpoint(IPodcastDb db, IFeedReader feedReader) : Endpoint<AddPodcastRequest, Podcast>
{
    public override void Configure()
    {
        Post("/api/podcasts");
        AllowAnonymous();
    }
    
    public override async Task HandleAsync(AddPodcastRequest request,  CancellationToken cancellationToken)
    {
        var podcast = feedReader.GetPodcast(request.FeedUrl);
        podcast = db.AddPodcast(podcast);
        await Send.OkAsync(podcast, cancellationToken);
    }
}