using LiteDB;

namespace PodFeeder.Api.Database;

public class PodcastDb(string dbPath) : IPodcastDb
{
    private string DbPath { get; } = dbPath;

    public Podcast AddPodcast(Podcast podcast)
    {
        if(podcast.Id == Guid.Empty)
        {
            podcast.Id = Guid.NewGuid();
        }
        
        podcast.LastViewedTime = DateTime.UtcNow;

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
        var podcasts = db.GetCollection<Podcast>();
        var podcast = podcasts.FindById(id);
        podcast.LastViewedTime = DateTime.UtcNow;
        podcasts.Update(podcast);
        
        return podcast;
    }

    public void DeletePodcast(Guid id)
    {
        using var db = new LiteDatabase(DbPath);
        var podcasts = db.GetCollection<Podcast>();
        podcasts.Delete(id);
    }
}
