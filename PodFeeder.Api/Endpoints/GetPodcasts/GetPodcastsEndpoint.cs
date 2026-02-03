using FastEndpoints;
using PodFeeder.Api.Database;

namespace PodFeeder.Api.Endpoints.GetPodcasts;

public class GetPodcastsEndpoint(IDb<Podcast> db) : Endpoint<GetPodcastsRequest, List<Podcast>>
{
    public override void Configure()
    {
        Get("/api/podcasts");
        AllowAnonymous();
    }

    public override async Task HandleAsync(GetPodcastsRequest request, CancellationToken cancellationToken)
    {
        var podcasts = db.Get();
        await Send.OkAsync(podcasts, cancellationToken);
    }
}