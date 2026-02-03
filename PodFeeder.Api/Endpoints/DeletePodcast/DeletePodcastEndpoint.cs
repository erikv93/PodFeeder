using FastEndpoints;
using PodFeeder.Api.Database;
using Void = FastEndpoints.Void;

namespace PodFeeder.Api.Endpoints.DeletePodcast;

public class DeletePodcastEndpoint(IPodcastDb podcastDb) : Endpoint<DeletePodcastRequest, Void>
{
    public override void Configure()
    {
        Delete("/api/podcasts/{PodcastId}");
        AllowAnonymous();
    }

    public override async Task HandleAsync(DeletePodcastRequest request, CancellationToken cancellationToken)
    {
        podcastDb.DeletePodcast(request.PodcastId); 
        await Send.NoContentAsync(cancellationToken);
    }
}