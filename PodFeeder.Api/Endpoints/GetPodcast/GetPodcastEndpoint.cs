using FastEndpoints;
using PodFeeder.Api.Database;

namespace PodFeeder.Api.Endpoints.GetPodcast;

public class GetPodcastEndpoint(IDb<Podcast> db) : Endpoint<GetPodcastRequest, Podcast>
{
    public override void Configure()
    {
        Get("/api/podcasts/{PodcastId}");
        AllowAnonymous();
    }

    public override async Task HandleAsync(GetPodcastRequest request, CancellationToken cancellationToken)
    {
        var podcast = db.Get(request.PodcastId);
        await Send.OkAsync(podcast, cancellationToken);
    }
}