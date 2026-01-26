using Microsoft.AspNetCore.Mvc;

namespace PodFeeder.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PodcastsController(IFeedReader feedReader, IPodcastDb podcastDb) : ControllerBase
{

    [HttpGet("")]
    public IEnumerable<Podcast> Get()
    {
        var podcasts = podcastDb.GetPodcasts();
        return podcasts;
    }

    [HttpPost("")]
    public Podcast AddPodcast([FromBody]Podcast podcast)
    {
        podcastDb.AddPodcast(podcast);
        return podcast;
    }

    [HttpGet("{podcastId}/episodes")]
    public IEnumerable<Episode> GetEpisodes(Guid podCastId)
    {
        var podcast = podcastDb.GetPodcastById(podCastId);
        return feedReader.GetEpisodes(podcast);
    }

    [HttpDelete("{podcastid}")]
    public ActionResult DeletePodcast(Guid podcastId)
    {
        podcastDb.DeletePodcast(podcastId);
        return NoContent();
    }
}
