namespace PodFeeder.Api;

public class Episode
{
    public required Podcast Podcast { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required DateTime PublishDate { get; set; }
    public required string DownloadUrl { get; set; }
}
