using Microsoft.EntityFrameworkCore;

namespace MoneyStat.DataBase;

public interface IMoneyStatDbContextBase
{
    Task SaveChangesAsync();
}

public class MoneyStatDbContextBase : DbContext, IMoneyStatDbContextBase
{
    public MoneyStatDbContextBase(DbContextOptions<MoneyStatDbContext> options)
        : base(options)
    {
        Database.EnsureCreated();
    }
    
    public Task SaveChangesAsync()
    {
        return base.SaveChangesAsync();
    }
}