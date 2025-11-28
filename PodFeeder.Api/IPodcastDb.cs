namespace PodFeeder.Api;

public interface IPodcastDb
{
	public Podcast AddPodcast(Podcast podcast);
    public IEnumerable<Podcast> GetPodcasts();
    public Podcast GetPodcastById(Guid id);
}
