using LiteDB;

namespace PodFeeder.Api.Database;

public class Db<T>(string dbPath) : IDb<T> where T : class
{
    private readonly LiteDatabase _db = new (dbPath);
    private ILiteCollection<T> Collection => _db.GetCollection<T>();
    
    public T Add(T entity)
    {
        Collection.Insert(entity);
        return entity;
    }

    public List<T> Get()
    {
        return Collection.FindAll().ToList();
    }

    public T Get(Guid id)
    {
        return Collection.FindById(id);
    }

    public void Delete(Guid id)
    {
        Collection.Delete(id);
    }
}