namespace PodFeeder.Api;

public interface IFeedReader
{
    public Podcast GetPodcast(string feedUrl);
    public IEnumerable<Episode> GetEpisodes(Podcast podcast);
}
