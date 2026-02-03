namespace PodFeeder.Api.Database;

public interface IPodcastDb
{
	public Podcast AddPodcast(Podcast podcast);
    public IEnumerable<Podcast> GetPodcasts();
    public Podcast GetPodcastById(Guid id);
    public void DeletePodcast(Guid id);
}
