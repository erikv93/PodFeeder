
using System.ServiceModel.Syndication;
using System.Xml;

namespace PodFeeder.Api;

public class FeedReader : IFeedReader
{
    public Podcast GetPodcast(string feedUrl)
    {
        using XmlReader reader = XmlReader.Create(feedUrl);
        var feed = SyndicationFeed.Load(reader);
        var lastUpdate = feed.LastUpdatedTime;
        return new Podcast
        {
            Id = Guid.NewGuid(),
            Name = feed.Title.Text,
            Description = feed.Description?.Text ?? string.Empty,
            FeedUrl = feedUrl,
            LastUpdatedTime = lastUpdate,
        };
    }

    public IEnumerable<Episode> GetEpisodes(Podcast podcast)
    {
        using XmlReader reader = XmlReader.Create(podcast.FeedUrl);

        var feed = SyndicationFeed.Load(reader);

        foreach (var item in feed.Items)
        {
            yield return new Episode
            {
                Podcast = podcast,
                Title = item.Title.Text,
                Description = item.Summary?.Text ?? string.Empty,
                PublishDate = item.PublishDate.DateTime,
                DownloadUrl = item.Links.FirstOrDefault(link => link.MediaType == "audio/mpeg")?.Uri.ToString() ?? string.Empty
            };
        }
    }
}
