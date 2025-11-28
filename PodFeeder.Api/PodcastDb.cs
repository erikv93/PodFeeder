using LiteDB;

namespace PodFeeder.Api;

public class PodcastDb(string dbPath) : IPodcastDb
{
    private string DbPath { get; } = dbPath;

    public Podcast AddPodcast(Podcast podcast)
    {
        if(podcast.Id == Guid.Empty)
        {
            podcast.Id = Guid.NewGuid();
        }

        using var db = new LiteDatabase(DbPath);
        db.GetCollection<Podcast>().Insert(podcast);
        return podcast;
    }

    public IEnumerable<Podcast> GetPodcasts()
    {
        using var db = new LiteDatabase(DbPath);
        return db.GetCollection<Podcast>().FindAll().ToList();
    }

    public Podcast GetPodcastById(Guid id)
    {
        using var db = new LiteDatabase(DbPath);
        return db.GetCollection<Podcast>().FindById(id);
    }
}
