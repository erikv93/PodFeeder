namespace PodFeeder.Api.Database;

public interface IDb<T> where T : class
{
    public T Add(T podcast);
    public List<T> Get();
    public T Get(Guid id);
    public void Delete(Guid id);
}