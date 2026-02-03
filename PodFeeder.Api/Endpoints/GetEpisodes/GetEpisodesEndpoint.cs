using FastEndpoints;

namespace PodFeeder.Api.Endpoints.GetEpisodes;

public class GetEpisodesEndpoint(IFeedReader feedReader) : Endpoint<GetEpisodesRequest, List<Episode>>
{
    public override void Configure()
    {
        Get("/api/podcasts/{PodcastId}/episodes");
        AllowAnonymous();
    }

    public override async Task HandleAsync(GetEpisodesRequest request, CancellationToken cancellationToken)
    {
        var episodes = feedReader.GetEpisodes(request.PodcastId);
        await Send.OkAsync(episodes.ToList(), cancellationToken);
    }
}