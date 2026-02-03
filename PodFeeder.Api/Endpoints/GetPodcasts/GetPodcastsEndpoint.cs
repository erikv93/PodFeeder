using FastEndpoints;
using PodFeeder.Api.Database;

namespace PodFeeder.Api.Endpoints.GetPodcasts;

public class GetPodcastsEndpoint(IPodcastDb db) : Endpoint<GetPodcastsRequest, List<Podcast>>
{
    public override void Configure()
    {
        Get("/api/podcasts");
        AllowAnonymous();
    }

    public override async Task HandleAsync(GetPodcastsRequest request, CancellationToken cancellationToken)
    {
        var podcasts = db.GetPodcasts().ToList();
        await Send.OkAsync(podcasts, cancellationToken);
    }
}