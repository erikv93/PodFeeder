namespace PodFeeder.Api;

public class Podcast
{
 
    public required Guid Id { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required string FeedUrl { get; set; }
}
